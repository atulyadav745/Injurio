import React, { useState } from 'react';
import logo from "../assets/logo.png"


import IonIcon from '@reacticons/ionicons';
import Image from 'next/image';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex items-center font-medium justify-around ">
        <div className="z-50 md:w-auto w-full flex justify-between">
          <a href="/">
          <Image src={logo} alt="logo"  className="md:cursor-pointer  w-[100%] h-[100%] ml-2 scale-100" /></a>

          <div className={`text-5xl cursor-pointer md:hidden  duration-500 m-2 pt-2 ${open ? "rotate-0" : "rotate-360" }`} onClick={() => setOpen(!open)}>
            <IonIcon name={`${open ? "close" : "menu"}`}></IonIcon>
          </div>
        </div>
        <div className='nav-links'>
        <ul className="md:flex hidden uppercase items-center gap-8  font-sans">
          <li>
            <a href="/"  color="inherit" className="py-7  hover:text-mauve active:text-mauve font-medium font-sans tracking-wider px-3 inline-block ">
              Home
            </a>
          </li>
          <li>
            <a href="/" className="py-7  hover:text-mauve active:text-mauve px-3 font-medium tracking-wider inline-block">
             About Us
            </a>
          </li>
          <li>
            <a href="/" className="py-7  hover:text-mauve active:text-mauve px-3 font-medium tracking-wider inline-block">
              Blog
            </a>
          </li>
          <li>
            <a href="/" className="py-7  hover:text-mauve active:text-mauve font-medium tracking-wider px-3 inline-block">
              Careers
            </a>
          </li>
         
        </ul></div>
        <div className=' space-x-4 md:flex hidden'>
          <a href='/api/auth/login'>
        <button className="bg-berry  text-white font-bold py-2 rounded px-4 focus:bg-mauve ">
          Login
        </button></a>
    </div>   
    
        <ul
          className={`
        md:hidden items-center fixed w-full top-0 overflow-y-auto bottom-0 py-20  z-20 h-[120%] 
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <div className='bg-mauve text-center justify-between text-blush h-full nav-links'>
          <li >
            <a href="/" className="py-7 px-3 inline-block">
              Home
            </a>
          </li>
          <li >
            <a href="/" className="py-7 px-3 inline-block">
            About Us
            </a>
          </li>
          <li >
            <a href="/" className="py-7 px-3 inline-block">
              Blog
            </a>
          </li>
          <li >
            <a href="/" className="py-7 px-3 inline-block">
              Careers
            </a>
          </li>
            <a href='/api/auth/login'>
          <button className="bg-berry  text-white font-bold py-2 rounded px-4 focus:bg-mauve">
          Login
        </button></a>
          
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;