import Footer from '@/components/Footer'
import React from 'react'
import Head from 'next/head'
import Analytics from './analytics'
import Navbar from '@/components/Navbar'

const Dashboard = () => {
  return (
   <>
    <Head>
      <title>Injury Tracking System|Dashboard</title>
    </Head>
    <Navbar/>
    <Analytics/>
   <Footer/>
   </>
  )
}

export default Dashboard
