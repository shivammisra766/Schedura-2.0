import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ContactPage = () => {
  return (
    <div className='dark:bg-gray-900 dark:text-gray-300 h-screen'>
      <Navbar/>
      <div>
        <h1>Get in touch</h1>
        <p>Want to get in touch? Fill out the form below:</p>
      </div>
      <Footer/>
    </div>
  )
}

export default ContactPage
