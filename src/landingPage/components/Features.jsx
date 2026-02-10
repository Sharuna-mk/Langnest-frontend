import React from 'react'
import { RiUserCommunityFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { PiPathFill } from "react-icons/pi";
import { RiMiniProgramLine } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import { SiImessage } from "react-icons/si";





function Features() {
  return (
    <>
    <div className=" min-h-screen" style={{backgroundColor:'#010336'}}>
      
     <h1 className='anim text-center lg:text-center text-xl md:text-5xl font-bold text-white'>Next-Gen Code Security</h1>

     <div className="anim mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ms-50 me-50">
        <div className="feature rounded-3xl p-6  shadow  border border-gray-300 hover:shadow-md hover:shadow-blue-900 
        hover:-translate-y-2 duration-300">
            <div className="flex justify-center ">
                 <RiUserCommunityFill className='md:text-6xl text-white'/>
            </div>
            <h1 className='md:text-2xl font-bold mt-5 text-center text-white'>Community Sharing</h1>
            <p className='text-center mt-3 text-lg text-white'>Share code snippets, projects, and solutions with peers.</p>
        </div>
        <div className="feature rounded-3xl p-6  shadow  border border-gray-300 hover:shadow-md hover:shadow-blue-900 
        hover:-translate-y-2 duration-300">
            <div className="flex justify-center">
                <FaSearch className='md:text-6xl text-white'/>
            </div>
            <h1 className='md:text-2xl font-bold mt-5 text-center text-white'>Smart Search & Filter</h1>
            <p className='text-center mt-3 text-lg text-white'>Find questions, solutions, or code snippets quickly.</p>
        </div>
        <div className="feature rounded-3xl p-6  shadow  border border-gray-300 hover:shadow-md hover:shadow-blue-900 
        hover:-translate-y-2 duration-300">
            <div className="flex justify-center">
                 <PiPathFill className='md:text-6xl text-white'/>
            </div>
            <h1 className='md:text-2xl font-bold mt-5 text-center text-white'>Personalized Learning Path</h1>
            <p className='text-center mt-3 text-lg text-white'>Start with your favorite tech stack</p>
        </div>
       
     </div>
     <div className="anim mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ms-50 me-50">
        <div className="feature rounded-3xl p-6  shadow  border border-gray-300 hover:shadow-md hover:shadow-blue-900 
        hover:-translate-y-2 duration-300">
            <div className="flex justify-center">
                 <RiMiniProgramLine className='md:text-6xl  text-white'/>
            </div>
            <h1 className='md:text-2xl font-bold mt-5 text-center text-white'>Multi-Language Support</h1>
            <p className='text-center mt-3 text-lg text-white'>Work with multiple programming languages seamlessly.</p>
        </div>
        <div className="feature rounded-3xl p-6  shadow  border border-gray-300 hover:shadow-md hover:shadow-blue-900 
        hover:-translate-y-2 duration-300">
            <div className="flex justify-center">
                 <MdSecurity className='md:text-6xl text-white'/>
            </div>
            <h1 className='md:text-2xl font-bold mt-5 text-center text-white'>Secure & Reliable</h1>
            <p className='text-center mt-3 text-lg text-white'>Top-notch safety for your data.</p>
        </div>
        <div className="feature rounded-3xl p-6  shadow  border border-gray-300 hover:shadow-md hover:shadow-blue-900 
        hover:-translate-y-2 duration-300 ">
            <div className="flex justify-center">
                 <SiImessage className='md:text-6xl text-white'/>
            </div>
            <h1 className='md:text-2xl font-bold mt-5 text-center text-white'>DM & Collaboration</h1>
            <p className='text-center mt-3 text-lg text-white'>Connect with other users, discuss solutions, and collaborate on projects.</p>
        </div>
       
     </div>
</div>
    </>
  )
}

export default Features
