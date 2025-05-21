import React, { useContext, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist'
  ]

  const filteredDoctors = useMemo(() => {
    if (!doctors) return []
    return speciality ? doctors.filter(doc => doc.speciality === speciality) : doctors
  }, [doctors, speciality])

  return (
    <div className='p-4'>
      <p className='text-xl font-semibold mb-4'>Browse through Doctor Specialists</p>
      <div className='flex gap-4 flex-wrap mb-6'>
        {specialities.map(spec => (
          <p
            key={spec}
            onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
            className={`cursor-pointer px-4 py-2 rounded-md border border-indigo-500 ${
              speciality === spec ? 'bg-indigo-500 text-white' : 'text-indigo-500'
            }`}
          >
            {spec}
          </p>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredDoctors.length === 0 ? (
          <p className='text-center text-gray-500 col-span-full'>
            No doctors found for "{speciality || 'All'}"
          </p>
        ) : (
          filteredDoctors.map((item, index) => (
            <div
              key={item._id || index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300'
            >
              <img
                className='bg-blue-50 w-full h-48 object-cover'
                src={item.image}
                alt={item.name}
                onError={(e) => { e.target.src = '/default-doctor.png' }} // Provide your fallback image path
              />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-green-500 mb-1'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Doctors