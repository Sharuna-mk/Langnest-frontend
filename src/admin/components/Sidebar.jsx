import React from 'react'
import logo from '../../assets/logobg.png'
import { Link } from 'react-router-dom'


function Sidebar() {
  return (
    <div>
       <aside className="fixed inset-y-0 left-0 m-4 w-64 rounded-2xl bg-white dark:bg-white shadow-xl flex flex-col shadow border border-gray-300">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5">
        <img src={logo} alt="logo" className="h-20 w-20" />
        <span className="text-xl font-bold text-[#66c2dd]">LangNest</span>
      </div>

      <hr className="border-slate-200 dark:border-slate-700" />

  
      <ul className="flex-1 mt-20 space-y-1 px-2 ">

        <li>
          <div className="flex items-center  px-4 py-2.5 rounded-lg dark:hover:bg-slate-80 text-blue-900 text-md font-bold cursor-pointer   hover:bg-slate-100  transition">
         <Link to='/admin'> Dashboard</Link>   
           
          </div>
        </li>

  
        <li>
          <div className="flex items-center mt-5 px-4 py-2.5 rounded-lg dark:hover:bg-slate-80 text-blue-900 text-md font-bold cursor-pointer   hover:bg-slate-100  transition">
        <Link to='userlist'> UserList</Link>  
           
          </div>
        </li>

        {/* Billing */}
        <li>
        <div className="flex items-center mt-5 px-4 py-2.5 rounded-lg dark:hover:bg-slate-80 text-blue-900 text-md font-bold cursor-pointer   hover:bg-slate-100  transition">
           <Link to='billing'> Billing</Link>     
           
          </div>
        </li>
        <li>
        <div className="flex items-center mt-5 px-4 py-2.5 rounded-lg dark:hover:bg-slate-80 text-blue-900 text-md font-bold cursor-pointer   hover:bg-slate-100  transition">
              <Link to='report'> Reports</Link> 
           
          </div>
        </li>

       

        {/* Settings */}
        <li>
          <div className="flex items-center mt-5 px-4 py-2.5 rounded-lg dark:hover:bg-slate-80 text-blue-900 text-md font-bold cursor-pointer   hover:bg-slate-100  transition">
           <Link to='profile'> Profile</Link>   
           
          </div>
        </li>
        {/* <li>
          Settings
        </li> */}

      </ul>


      

    </aside>
    </div>
  )
}

export default Sidebar
