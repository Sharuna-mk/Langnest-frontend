import React from 'react'
import Header from '../components/Header'
import Features from '../components/Features'
import Language from '../components/Language'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import hero from '../../assets/ero.png'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <>
     <div className='bg-[#010336]' >
      <Header />
     
    <div className=''>
       <div className="min-h-screen">
         <h1 className='text-7xl font-bold text-white text-center pt-40'
         >Where Developers Ask, Learn, <br /> and Grow Together.</h1>
         <div>
            <p className='mt-10 italic text-xl text-gray-300 text-center '>A next-gen community where developers solve doubts together
              <br />—Python, Java, JavaScript, C++, and beyond. Learn faster, build smarter.</p>
         </div>

          <div className="flex justify-center mt-10">
                <button
      className=" relative mt-5 inline-block p-px font-semibold leading-6 text-white dark:bg-gray-500 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
    >
            <span
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>

      <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950 ">
        <div className="relative z-10 flex items-center space-x-2">
         <Link to='/register'>
          <span className="transition-all duration-500 group-hover:translate-x-1"
            >get started</span>
         </Link>
        </div>

      </span>
    </button>
        

          </div>
          

         <div className="anim  flex items-center justify-center mt-25 ">
        
           <img src={hero} alt="" width={'30%'} className=' inset-0 object-cover'/>

         </div>
       </div>
    </div>
  <div id="features">
      <Features />
  </div>

    <div className="relative w-full min-h-[1200px]">
  

  <img
    src="https://whiteduck.de/wp-content/uploads/WD-Developer-Productivity-Website-1170x680px.gif"
    alt=""
    className="sticky top-0 w-full h-screen object-cover z-0"
  />

  <div className="relative z-10 -mt-[100vh] pt-[120vh]">
    <Language />
  </div>

</div>

     <Banner/>
     <Footer/>
     </div>
    </>
  )
}

export default HeroSection
