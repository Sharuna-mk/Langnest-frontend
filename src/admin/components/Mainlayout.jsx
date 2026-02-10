import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Dashboard from '../pages/Dashboard'
import Userlist from '../pages/Userlist'
import Billing from '../pages/Billing'
import Reports from '../pages/Reports'
import Adminprofile from '../pages/Adminprofile'
import { Outlet } from 'react-router-dom'


function Mainlayout() {
  return (
    <div>
      <Sidebar/>
      <Header/>
     <Outlet/>
    </div>
  )
}

export default Mainlayout
