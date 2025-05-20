import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import MyProfile from './pages/MyProfile.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import Doctors from './pages/Doctors.jsx'
import Navbar from './components/Navbar.jsx'
import Appointment from './pages/Appointment.jsx'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path = '/' element={<Home />} />
        <Route path = '/doctor' element={<Doctors />} />
        <Route path = '/doctor/:speciality' element={<Doctors />} />
        <Route path = '/login' element={<Login />} />
        <Route path = '/about' element={<About />} />
        <Route path = '/contact' element={<Contact />} />
        <Route path = '/my-profile' element={<MyProfile />} />
        <Route path = '/my-appointments' element={<MyAppointments />} /> 
        <Route path = '/appointment/:docID' element={<Appointment />} />
      </Routes>
      {/*<Footer />*/}
    </div>
  )
}
export default App
