import React from 'react';
import { Button, Space } from 'antd';
import { useUser } from '@auth0/nextjs-auth0/client'
import animation from "../assets/doctor.json"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Login: React.FC = () => {
  const { user, error, isLoading } = useUser();

  return (
    <>
    <Navbar/>
    <section className="grid mx-auto h-[90vh] px-4  sm:px-6 lg:px-8 max-w-full bg-white lg:mb-0">
        <div className="grid mx-auto max-w-screen-xl px-4 py-0  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
           
             <p className="text-xl text-mauve uppercase font-medium font-sans mb-8">
             Less  Hassle, More Care With Lief Care
            </p>
            <span className="sm:text-6xl text-3xl max-w-2xl font-sans font-extrabold text-mauve ">
            An advanced Injury Tracking System with LiefCare
            </span>
            <p className="text-lg text-gray font-medium mt-12">
            The future of Care Records Management
            </p>
          
           <a href='/api/auth/login'>
            <button
                           className="inline-flex items-center justify-centermr-3 font-medium text-center text-white  bg-berry mt-16   px-7 py-3   text- leading-snug rounded-full shadow-md hover:bg-red hover:shadow-lg focus:bg-mauve focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out uppercase"

            >
              {user?.name ? "Go to Dashboard" : "Register Now"}
             
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex" >
          <Lottie animationData={animation}/>   
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Login;
