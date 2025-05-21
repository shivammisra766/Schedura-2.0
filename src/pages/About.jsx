import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const AboutPage = () => {
  return (
    <div className='dark:bg-gray-900 dark:text-gray-300 h-screen'>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="mb-4">
                Welcome to our website! We are dedicated to providing the best service possible.
            </p>
            <p className="mb-4">
                Our team is committed to excellence and we strive to exceed your expectations.
            </p>
            <p>
                Thank you for visiting our site!
            </p>
        </div >
        <Footer />
    </div>
    )
}

export default AboutPage
