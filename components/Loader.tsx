import React from 'react'
import { useLottie } from "lottie-react";
import loader from "../assets/loader.json"

const Loader = () => {
    const options = {
        animationData: loader,
        loop: true
      };
      const { View } = useLottie(options);
  return (
    <div className='center m-auto h-[50]'>
      {View}
    </div>
  )
}

export default Loader
