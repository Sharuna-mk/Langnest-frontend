import React from 'react'
import preloader from '../../assets/preloader.mp4'

function Preloader() {
  return (
    <>
    <div className="w-full h-screen flex justify-center items-center bg-[#191b34]">
        <video src={preloader} 
        autoPlay
        loop
        muted
        playsInline
        className="w-40 h-40" alt="Preloader" />
    </div>
      
    </>
  )
}

export default Preloader