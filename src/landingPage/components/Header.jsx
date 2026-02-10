import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import logo from '../../assets/logobg.png'



function Header() {
//to check whether navmenu is open or close
 const [nav,setNav]=useState(false)
  return (
    <>
       <header>
      <nav>
        <div className='shadow fixed top-0  z-150 w-full px-4 lg:px-6 py-1.2' style={{backgroundColor:'#010336'}}>
        <div className="flex flex-wrap justify-between items-center w-full ">
          <a href="#">
            {/* logo */}
            <div className="flex items-center">
  <img src={logo} alt="Logo" width={'100px'} />
            <span className="text-2xl font-semibold whitespace-nowrap text-[#66c2dd]">
          
              LangNest
            </span>
            </div>
            
          </a>
            {/*to show nav items */}
          <div
            className={`flex-col md:flex md:flex-row items-center w-full md:w-auto md:order-2 transition-all duration-300 ${
              nav
                ? "absolute top-14 left-0 w-full bg-white shadow-md p-4 md:relative md:top-0 md:w-auto md:bg-transparent md:shadow-none"
                : "hidden md:flex gap-6"
            }`}
          >
            {/* items */}
            <ul className

="flex flex-col md:flex-row md:gap-8 gap-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700  rounded md:bg-transparent md:text-primary-700 md:p-0 dark:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                href='#features'
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                 to={'/about'}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link to={'/login'}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
               >
                  Log In
                </Link>
              </li>
            </ul>
            <Link to={'/register'}
              className="mt-4 md:mt-0 rounded-full bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Sign Up 
            </Link>
          </div>
     {/* hamburger icon for mobile devices */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setNav(!nav)}
            >
             {nav?<IoClose /> :<GiHamburgerMenu />
             }
            </button>
          </div>
        </div>
        </div>
      </nav>
    </header>
    </>
  )
}

export default Header
