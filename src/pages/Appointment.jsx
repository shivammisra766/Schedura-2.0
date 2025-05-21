import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';


const Appointment = () => {
  const {docId} = useParams();
  const {doctors, currencySymbol} = useContext(AppContext);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] =useState(0)
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo =async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {

    setDocSlots([])

    //current date

    let today = new Date()
    
    for(let i=0; i<7; i++){
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)

      //end time of date
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      //setting hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []
      while(currentDate<endTime){
        let formattedTime = currentDate.toLocaleTimeString('en-US', {hour12: false})
        //add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        //increment time by 30min
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() =>{
    fetchDocInfo()
  },[doctors,docId])

  useEffect(() =>{
    getAvailableSlots()
  },[docInfo])

  useEffect(()=> {
    console.log(docSlots)
  },[docSlots])

  return docInfo && (
    <div>

      {/*--------------Doctor Details-------------- */}
      <div>
        <div>
          <img src={docInfo.image} alt = ""/>
        </div>

        <div>
          {/*--------------Doc Info Name degree experience*/}
          <p>{docInfo.name} <img src={assets.verified_icon} alt="verified icon" /> </p>
        </div>
        <p>{docInfo.degree} - {docInfo.speciality}</p>
        <button>{docInfo.experience}</button>
      </div>

      {/*--------Doctor About-----------*/}
      <div>

        <p> 
          About <img src={assets.info_icon} alt="info icon" />        
        </p>
        <p>{docInfo.about}</p>
      </div>
      <p>Appointment fee <span>{currencySymbol}{docInfo.fees}</span>
      </p>

      <div>
        {/*----Booking Slots-----*/}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div>
            {
              docSlots.length && docSlots.map((item, index) =>(
                <div onClick={()=> setSlotIndex(index)} key={index}>

                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p> 
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>
          <div>
            {
              docSlots.length && docSlots[slotIndex].map((item, index) =>(
                <p key={index} onClick={()=>setSlotTime(item.time)}>
                  {item.time.toLowerCase()}
                </p>
              ))
            }
          </div>
        </div>
        <button> Book an Appointment</button>
      </div>
      {/*Listing RELATED DOCTORS */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}
export default Appointment
