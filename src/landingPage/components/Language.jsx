import React from 'react'
import { RiUserCommunityFill } from "react-icons/ri";

function Language() {
  return (
    <>
      <div className="min-h-screen mt-10 z-50">
          
    <div className='feature min-h-screen'>
             <h1 className='anim text-center lg:text-center text-3xl md:text-4xl font-bold text-white mt-10'>Begin With The Stack You Love..</h1>
    
         <div className="anim mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ms-50 me-50 ">
            <div className="text-white border-1 border-gray-700 rounded-2xl shadow p-6 bg-blue-500/10 backdrop-blur-md">
                <img width="20%" src="https://img.icons8.com/fluency/48/java-coffee-cup-logo.png" alt="java-coffee-cup-logo" className='md:ms-3'/>
                <h1 className='md:text-xl font-bold  ms-5 text-start mt-3'>JAVA</h1>
                <p className='text-start mt-3 text-md ms-5'>Master Java by learning with the community solve backend challenges, share snippets, and build real-world applications together.</p>
            </div>
            <div className="text-white border-1 border-gray-700 rounded-2xl shadow p-6 bg-blue-500/10 backdrop-blur-md">
               <img width="15%"  src="https://img.icons8.com/fluency/48/javascript.png" alt="javascript" className='md:ms-3'/>
                <h1 className='md:text-xl font-bold mt-5 ms-5 text-start'>JAVASCRIPT</h1>
                <p className='text-start mt-5 text-md ms-5'>Collaborate and grow with JavaScript share snippets, solve real frontend challenges, and build interactive web experiences alongside the community.</p>
            </div>
            <div className="text-white border-1 border-gray-700 rounded-2xl shadow p-6 bg-blue-500/10 backdrop-blur-md">
               <img width="48" height="48" src="https://img.icons8.com/fluency/48/python.png" alt="python"/>
                <h1 className='md:text-xl font-bold mt-5 ms-5 text-start'>PYTHON</h1>
                <p className='text-start mt-5 text-md ms-5'>Master Python faster with shared solutions, community tips, and real discussions from fellow developers.</p>
            </div>
           
         </div>
         <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ms-50 me-50 ">
            <div className="text-white border-1 border-gray-700 rounded-2xl shadow p-6 bg-blue-500/10 backdrop-blur-md">
                <img width="40" height="40" src="https://img.icons8.com/office/40/react.png" alt="react" className='md:ms-3 mt-3'/>
                <h1 className='md:text-xl font-bold mt-5 ms-5 text-start'>REACT</h1>
                <p className='text-start mt-5 text-md ms-5'>Master React hooks, components, and state logic with help from developers solving the same UI challenges as you.</p>
            </div>
            <div className="text-white border-1 border-gray-700 rounded-2xl shadow p-6 bg-blue-500/10 backdrop-blur-md">
                   <img width="48" height="48" src="https://img.icons8.com/color/48/nodejs.png" alt="nodejs"/>
                <h1 className='md:text-xl font-bold mt-5 ms-5 text-start'>NODE.JS</h1>
                <p className='text-start mt-5 text-md ms-5'>Build scalable backends with Node.js—share API logic, debug servers together, and learn backend development through real community examples.</p>
            </div>
            <div className="text-white border-1 border-gray-700 rounded-2xl shadow p-6 bg-blue-500/10 backdrop-blur-md">
                <div className="flex">
  <img width="48" height="48" src="https://img.icons8.com/fluency/48/html-5.png" alt="html-5"/>
 
               <img width="48" height="48" src="https://img.icons8.com/fluency/48/css3.png" alt="css3"/>
                </div>
             
                <h1 className='md:text-xl font-bold mt-5 ms-5 text-start'>HTML + CSS</h1>
                <p className='text-start mt-5 text-md ms-5'>Learn HTML and CSS by building structured layouts, responsive designs, and clean user interfaces with community examples.</p>
            </div>
           
         </div>
    </div>
    </div>
      
    </>
  )
}

export default Language
