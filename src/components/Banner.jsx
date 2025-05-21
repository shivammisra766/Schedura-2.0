import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()


  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 m:mx-10'>

        {/*---------------------Left Side-------------------------*/}

        <div>
            <div className='text-xl sm:text-2xl md:text-3xl le:text-5xl font-semibold text-white'>
                <p> Book Appointment</p>
                <p className='mt-4'>With 100+ Trusted Doctors</p>
            </div>
            <button onClick={()=>{navigate(`/login`)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button>
        </div>
        {/*--------------------Right Side-----------------*/}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="Appointment illustration"/>
        </div>



    </div>
  )
}
export default Banner
