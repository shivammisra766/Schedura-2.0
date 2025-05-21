import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img className='w-[200px] cursor-pointer' src="/icon.jpg" alt="Icon" />

      <ul className='flex items-center gap-[50px] font-medium'>
        {['/', '/doctor', '/about', '/contact'].map((path, i) => {
          const labels = ['Home', 'All Doctors', 'About', 'Contact'];
          return (
            <NavLink key={path} to={path}>
              <li className='py-[10px] text-lg font-semibold text-gray-800 uppercase tracking-wide cursor-pointer hover:text-primary transition-colors duration-300'>
                {labels[i]}
              </li>
              <hr className='border-none outline-none h-[5px] bg-primary w-3/5 m-auto hidden md:block' />
            </NavLink>
          );
        })}
      </ul>

      <div className='flex items-center gap-[40px]'>
        {token ? (
          <div className='text-black flex items-center gap-[20px] cursor-pointer group relative'>
            <img className='w-[80px] rounded-full' src={assets.profile_pic} alt="" />
            <img className='w-[25px]' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-20 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 bg-white shadow-lg rounded-lg p-3'>
              <div className='min-w-[120px] bg-stone-100 rounded flex flex-col gap-3 p-3'>
                <p onClick={() => navigate('/profile')} className='hover:text-black hover:bg-gray-200 cursor-pointer rounded px-2 py-1 transition-colors duration-200'>Profile</p>
                <p onClick={() => navigate('/appointments')} className='hover:text-black hover:bg-gray-200 cursor-pointer rounded px-2 py-1 transition-colors duration-200'>Appointments</p>
                <p onClick={logout} className='hover:text-black hover:bg-gray-200 cursor-pointer rounded px-2 py-1 transition-colors duration-200'>LogOut</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light md:block'>
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
