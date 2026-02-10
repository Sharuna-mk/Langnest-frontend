import React, { useState } from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Search from '../components/Search';
import { Link, Outlet, useParams } from 'react-router-dom';
import logo from '../../assets/logobg.png';
import Home from '../components/Home';
import premium from '../../assets/premium.png'



function Userhome() {
const { selectedLanguage } = useParams();  
const [collapsed,setCollapsed] = useState(false)
const userDetails = sessionStorage.getItem("userDetails")
const userData = JSON.parse(userDetails)
const userLanguage = userData.selectedLanguage
const language = selectedLanguage  || userLanguage

  return (

    <>
    
      <div className="min-h-screen text-white bg-primary dark:bg-primary-dark">
       
        <div className="flex min-h-screen">
          <div className="relative">
          <div className={`fixed bg-primary dark:bg-primary-dark text-black dark:text-white border-x border-gray-400 shadow hidden sm:block pb-150 
  transition-all duration-300 ease-in-out
            ${collapsed?" w-25 p-5" : "w-64"}`} >

            <div className={` flex flex-col   gap-10 font-semibold text-lg transition-all duration-300 
             ${collapsed ?  "w-30 p-4" : "w-64 md:p-10"}`
             }>
              
                  <div className="flex items-center">
                    <img src={logo} alt="" width={'80px'} className={`${collapsed && '-ms-8'}`} />
                     { !collapsed &&
                <div className="mt-5 text-[#66c2dd] ">LangNest</div>
                }
                  </div>
                
             
              <Link to={`/user/${language}/feed`}>
              <div className='flex items-center cursor-pointer mt-10' onClick={()=>setCollapsed(false)}> 
              <GoHomeFill className='text-3xl' />
              {!collapsed &&  <span className='ms-3'>Home</span>}
          </div></Link>
              
         
              <Link to="message">
              <div className='flex items-center cursor-pointer' onClick={()=>setCollapsed(true)}>
              <RiMessage3Fill className='text-3xl' />{!collapsed && <span className='ms-3'>Messages</span> }
              </div>
              </Link> 
          
              <div className='flex items-center cursor-pointer' onClick={()=>setCollapsed(false)}><IoMdNotifications className='text-3xl' />
              {!collapsed && <span className='ms-3 transition-all duration-100'>Notifications</span>  }
              </div>
             
                <Link to={`/user/${language}/create-post`} > 
                 <div className='flex items-center cursor-pointer' onClick={()=>setCollapsed(false)}>
                <MdOutlineAdd className='text-3xl' />
                {!collapsed && <span className='ms-3'>Create</span>}
                </div></Link>
           
              <Link to="profile">
               <div className='flex items-center cursor-pointer' onClick={()=>setCollapsed(false)}>
                  <FaRegUserCircle className='text-3xl' />
         
              {!collapsed && <span className='ms-3'>Profile</span>}
                     </div> </Link>
              <Link to="premium">
               <div className='flex items-center cursor-pointer' onClick={()=>setCollapsed(false)}>
                  <img src={premium} alt=""  className='w-10 h-10'/>
         
              {!collapsed && <span className=''>Premium</span>}
                     </div> </Link>
              
                <Link to="setting">
                <div className='flex items-center cursor-pointer mt-30' onClick={()=>setCollapsed(false)}>
                <IoMdSettings className='text-3xl' />
                {!collapsed && <span className='ms-3' >Settings</span>}</div>
                </Link> 

            </div>

          </div>

          <div className="md:w-5/6 ml-120 flex justify-center">
             
                

                 <Outlet />
          

          </div>
          </div>
          <div className="block sm:hidden text-white fixed bottom-0 left-0 w-full border border-gray-700 text-white p-4 text-center">
            <div className="flex justify-between">
              <GoHomeFill className='text-3xl ms-5' />
              <FaSearch className='text-3xl' />
              <MdOutlineAdd className='text-3xl' />
              <RiMessage3Fill className='text-3xl' />
              <FaRegUserCircle className='text-3xl me-5' />

            </div>
          </div>
        </div>

      </div>


    </>
  )
}

export default Userhome
