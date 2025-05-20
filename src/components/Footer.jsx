import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div>
        <div>
            {/*--------------Left----------------- */ }
            <img src={assets.logo}></img>
            <p>Schedura is a smart, user-friendly appointment scheduling platform designed to simplify the way people connect with essential service providers. Whether it’s booking a consultation with a doctor, a grooming session with a barber, a diagnostic visit to a pathologist, or a check-up for a beloved pet with a vet — Schedura brings it all under one roof. Our goal is to create a seamless experience for users to discover and book appointments with trusted professionals while helping service providers grow their business and reach a wider audience.</p>
        </div>
        <div>
            {/*--------------Center----------------- */ }
            <p>Company</p>
            <p>About US</p>
            <p>Contact us</p>
            <p>Privacy Policy</p>
        </div>
        <div>
            {/*--------------Right----------------- */ }
            <p>GET IN TOUCH</p>
            <ul>
                <li>+91 9xxxxxxxxx</li>
            </ul>
        </div>
        <div>
            {/*---------------------CopyRight-------------------------------------*/ }

            <p>Copyright 2025@ Schedura - All Right Reserved.</p>
        
        </div>

    </div>
  )
}

export default Footer