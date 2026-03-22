import React, { useContext } from 'react'
import { IoChevronForward } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContextShare } from '../../context/ThemeContext';
import { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import userlogo from '../../assets/user.webp';
import { userAPI, userUpdateAPI } from '../../services/allAPI';

function Settings() {
  const { toggleTheme, theme } = useContext(ThemeContextShare)
  const [refreshFeed, setRefreshFeed] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    profile: ''
  })


  const [preview, setPreview] = useState("")
  const [token, setToken] = useState('')
  const [userDetails, setUserDetails] = useState({})
  const [steps, setSteps] = useState(1)
  const [selected, setSelected] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const navigate = useNavigate()

  const getUserData = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await userAPI(reqHeader);
      console.log(response);
      setUserData(response.data)

    } catch (error) {
      console.log(error);

    }
  }


  //image upload
  const handleUpload = async (e) => {

    console.log(e.target.files[0]);

    // convert to url

    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);

    setPreview(url)
    setUserData({ ...userData, profile: e.target.files[0] })

  }

  //update user

  const handleUpdateUser = async () => {
    const prevUserData = { ...userData };
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const reqBody = new FormData()
    reqBody.append("username", userData.username);
    reqBody.append("email", userData.email);
    reqBody.append("bio", userData.bio);
    reqBody.append("selectedLanguage", userData.selectedLanguage);

    if (userData.profile instanceof File) {
      reqBody.append("profile", userData.profile);
    }
    const toastId = toast.loading("Saving changes...");
    try {
      const res = await userUpdateAPI(reqBody, reqHeader);
      console.log(res);


      toast.success(res.data.message, { id: toastId });
      setEditModal(false);


    } catch (error) {

      toast.error(
        error.res?.data?.message || "User already existing ",
        { id: toastId }
      );

      setUserData(prevUserData);

    }
  }

  const handleLogout = async()=>{
    sessionStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    const userToken = sessionStorage.getItem("token")
    const userDetails = sessionStorage.getItem("userDetails")

    if (userToken) {
      setToken(userToken)
      setUserDetails(JSON.parse(userDetails))

    }

  }, [])
  useEffect(() => {
    if (token) {
      getUserData()

    }
  }, [token, refreshFeed])

  return (
    <div>
      <div className="flex justify-center text-black dark:text-white ">
        <div>
          <h2 className='text-2xl font-bold text-start mt-20 '>Settings</h2>
          {/* profile */}
          <div className="feature  mt-10  w-200 p-5 bg-white dark:bg-[#111928BF]">
            <h2 className='text-xl font-bold'>Profile information</h2>

            <div className='cursor-pointer' onClick={() => setEditModal(true)}>
              <div className='flex justify-between items-center mt-5'>
                <p className='rounded-sm' >Edit Profile</p>
                <IoChevronForward />
              </div>
            </div>

             <Modal show={editModal} onClose={() => setEditModal(false)} className="bg-transparent backdrop-blur-xl">
                <div className="fixed inset-0 bg-transparent">
                  <ModalBody className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 mt-30 shadow border border-gray-600">
                    <div >
                      {/* Header */}
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                        Edit Profile
                      </h2>

                      {/* Profile Image */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                          <img
                            src={preview || userData.profile || userlogo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
                          />
                          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700">
                            <input type="file" className="hidden" onChange={(e) => handleUpload(e)} />
                            ✎
                          </label>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Change profile photo
                        </p>
                      </div>

                      {/* Form */}
                      <form className="space-y-4">
                        {/* Username */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Username
                          </label>
                          <input
                            type="text"
                            placeholder="Enter username"
                            value={userData.username}
                            onChange={(e) => { setUserData({ ...userData, username: e.target.value }) }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={userData.email}
                            onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }}
                            placeholder="Enter email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* bio */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Bio
                          </label>
                          <textarea name="" id=""
                            onChange={(e) => { setUserData({ ...userData, bio: e.target.value }) }}
                            value={userData.bio}
                            className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'></textarea>
                        </div>

                        
                        <div className="flex justify-end gap-3 pt-4">
                          <button
                            type='button'
                            onClick={() => {
                              setEditModal(false)
                            }}
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => { handleUpdateUser() }}
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </ModalBody>
                </div>

              </Modal>

            <div className='cursor-pointer' onClose={() => setSelected(true)}>
              <div className='flex justify-between items-center mt-5'>
                <p className='rounded-sm'>Change language</p>
                <IoChevronForward />
              </div>
            </div>
          </div>
          {/* password */}
          <div className="feature  mt-10  w-200 p-5 bg-white dark:bg-[#111928BF]">
            <h2 className='text-xl font-bold'>Account settings</h2>

            <div className='cursor-pointer'>
              <div className='flex justify-between items-center mt-5'>

                <p className='rounded-sm'>Change password</p>
                <IoChevronForward />
              </div>
            </div>
          </div>
          {/* Display */}
          <div className="feature  mt-10  w-200 p-5 bg-white dark:bg-[#111928BF]">
            <h2 className='text-xl font-bold'>Display</h2>

            <div className='cursor-pointer'
              onClick={toggleTheme}
            >
              <div className='flex justify-between items-center mt-5  '>

                <p className='rounded-sm'>{theme === 'dark' ? 'Light mode ☀️' : 'Dark mode 🌙'}</p>

              </div>
              <div className='flex justify-between items-center mt-5 '>

                <p className='rounded-sm'>Font size</p>
                <IoChevronForward />
              </div>
            </div>
          </div>
          {/* notification */}
          <div className="feature  mt-10  w-200 p-5 bg-white dark:bg-[#111928BF]">
            <h2 className='text-xl font-bold'>Billing and Payment</h2>

            <div className='cursor-pointer'>
              <div className='flex justify-between items-center mt-5'>

                <p className='rounded-sm'>Add new account</p>
                <IoChevronForward />
              </div>
            </div>
          </div>
          {/* notification */}
          <div className="feature  mt-10  w-200 p-5 bg-white dark:bg-[#111928BF]">
            <h2 className='text-xl font-bold'>Notification</h2>

            <div className='cursor-pointer'>
              <div className='flex justify-between items-center mt-5'>

                <p className='rounded-sm'>Push notification</p>
                <IoChevronForward />
              </div>
            </div>
            <div className='cursor-pointer'>
              <div className='flex justify-between items-center mt-5'>

                <p className='rounded-sm'>Email notification</p>
                <IoChevronForward />
              </div>
            </div>
          </div>
          {/* security */}
          <div className="feature  mt-10  w-200 p-5 bg-white dark:bg-[#111928BF]">
            <h2 className='text-xl font-bold'>Security</h2>

            <div className='cursor-pointer'>
              <div className='flex justify-between items-center mt-5'>

                <p className='rounded-sm'>Two-factor authentication</p>
                <IoChevronForward />
              </div>
              <div className='flex justify-between items-center mt-5'>

                <p className='rounded-sm'>Active Session</p>
                <IoChevronForward />
              </div>
              <div className='flex justify-between items-center mt-5'>

                <p className='rounded-sm'>Login history</p>
                <IoChevronForward />
              </div>
            </div>
          </div>
         
            <div className="feature  mt-10  w-200 p-5 cursor-pointer bg-white dark:bg-[#111928BF]" onClick={handleLogout} >

              <p className='rounded-sm text-red-500'
              >Logout</p>

            </div>
         
          <div className="feature  mt-5  w-200 p-5 cursor-pointer bg-white dark:bg-[#111928BF]">


            <p className='rounded-sm text-red-500'>Delete account</p>

          </div>

        </div>

      </div>
      <Toaster position="top-center" richColors />

    </div>
  )
}

export default Settings
