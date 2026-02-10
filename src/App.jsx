import { Route,  Routes } from 'react-router-dom'
import './App.css'
import HeroSection from './landingPage/pages/HeroSection'
import About from './landingPage/pages/About'
import Userhome from './user/pages/Userhome'
import Preloader from './landingPage/pages/Preloader'
import { useEffect, useState } from 'react'
import Settings from './user/components/Settings'
import Createpost from './user/components/Createpost'
import Home from './user/components/Home'
import Profile from './user/components/Profile'
import Mainlayout from './admin/components/Mainlayout'
import Message from './user/components/Message'
import Language from './user/pages/Language'
import Dashboard from './admin/pages/Dashboard'
import Billing from './admin/pages/Billing'
import Reports from './admin/pages/Reports'
import Userlist from './admin/pages/Userlist'
import Adminprofile from './admin/pages/Adminprofile'
import Auth from './authentication/Auth'
import Protectedroute from './user/components/Protectedroute'
import SinglePost from './user/components/SinglePost'
import EditProfile from './user/components/EditProfile'
import Premium from './user/components/Premium'
import PaymentSucess from './user/components/payment/PaymentSucess'
import PaymentFailed from './user/components/payment/PaymentFailed'
import PageNotFound from './pages/PageNotFound'


function App() {
   const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }, [])

  return (
    <>
 
   <Routes>
    <Route path='/' element={loading ? <Preloader /> : <HeroSection />} />
    <Route path='/login' element={<Auth/>}/>
    <Route path='/register' element={ <Auth register/>}/>
    <Route path='/about' element={ <About/>}/>
    <Route path='/*' element={<PageNotFound/>}/>
   

  {/* user */}
   <Route path='/language' element={<Protectedroute><Language/></Protectedroute>}/>
    <Route path="/user" element={<Userhome />}>
   <Route index path=":language/feed"  element={ <Home />}/>
   <Route path="message" element={ <Message />}/>
   <Route path="premium" element={ <Premium />}/>
   <Route path="editProfile" element={ <EditProfile />}/>
   <Route path=":language/create-post" element={ <Createpost />}/>
   <Route path="profile" element={ <Profile />}/>
   <Route path="setting" element={ <Settings />}/>
    </Route>
    <Route path='/payment-success' element={<PaymentSucess/>}/>
    <Route path='/payment-failed' element={<PaymentFailed/>}/>
    <Route  path="/posts/:id"  element={ <SinglePost />}/>
    
    {/* admin */}
    <Route path='/admin' element={<Mainlayout/>}>
    <Route index element={<Dashboard/>}/>
    <Route path='billing' element={<Billing/>}/>
    <Route path='userlist' element={<Userlist/>}/>
    <Route path='report' element={<Reports/>}/>
    <Route path='profile' element={<Adminprofile/>}/>

    </Route>

   </Routes>
  
   
  
    </>
  )
}

export default App
