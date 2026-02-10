import React, { useEffect, useState } from 'react'
import { IoChevronForward } from "react-icons/io5";
import { adminAPI, updateadminAPI } from '../../services/allAPI';
import { toast, Toaster } from 'sonner';

function Adminprofile() {

  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
    bio: '',
    profile: ''
  })
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState('')
  const [userDetails, setUserDetails] = useState({})

  const getAdminData = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await adminAPI(reqHeader);
      console.log(response);
      setAdminData(response.data)

    } catch (error) {
      console.log(error);

    }
  }

  const handleUpload = async (e) => {

    console.log(e.target.files[0]);

    // convert to url

    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);

    setPreview(url)
    setAdminData({ ...adminData, profile: e.target.files[0] })

  }

  //update user

  const handleUpdateAdmin = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const reqBody = new FormData()
    reqBody.append("username", adminData.username);
    reqBody.append("bio", adminData.bio);
    reqBody.append("password", adminData.password);

    if (adminData.profile instanceof File) {
      reqBody.append("profile", adminData.profile);
    }
    const toastId = toast.loading("Saving changes...");
    try {
      const res = await updateadminAPI(reqBody, reqHeader);
      console.log(res);


      toast.success("updated Successfully", { id: toastId });


    } catch (error) {

    console.log(error);
    
    }
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
      getAdminData()

    }
  }, [token])


  return (
    <div>

      <div className="ms-80 -mt-63 me-10">
        <div className="flex justify-center ">




          <div className="min-h-screen flex items-center justify-center px-6 w-full ">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3">

              {/* LEFT PANEL */}
              <div className="bg-gradient-to-b from-blue-700 to-indigo-800 p-8 flex flex-col items-center text-white">
               <div className="relative">
                                    <img
                                      src={preview || adminData.profile}
                                      alt="Profile"
                                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
                                    />
                                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700">
                                      <input type="file" className="hidden" onChange={(e) => handleUpload(e)} />
                                      ✎
                                    </label>
                                  </div>
              <h3 className="text-lg font-semibold">Administrator</h3>

              <div className="mt-6 w-full space-y-3 text-sm">
                <div className="flex justify-between border-b border-blue-400/40 pb-2">
                  <span>Role</span>
                  <span className="font-medium">Admin</span>
                </div>
                <div className="flex justify-between border-b border-blue-400/40 pb-2">
                  <span>Status</span>
                  <span className="text-green-300 font-medium">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Login</span>
                  <span className="text-blue-200">Today</span>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="md:col-span-2 p-8  bg-white">
              <h2 className="text-xl font-semibold text-black mb-6">
                Account Settings
              </h2>

              <div className="space-y-5">

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={adminData.username}
                    onChange={(e)=>{setAdminData({...adminData,username:e.target.value})}}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    disabled
                    value={adminData.email}
                    placeholder="Admin username"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* bio */}
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Bio
                  </label>
                  <textarea name="" id=""
                    value={adminData.bio}
                    onChange={(e)=>{setAdminData({...adminData,bio:e.target.value})}}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-sm font-semibold mb-3">
                    Security
                  </h3>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium  mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={adminData.password}
                      onChange={(e)=>{setAdminData({...adminData,password:e.target.value})}}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium  mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-6">
                  <button className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Cancel
                  </button>
                  <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleUpdateAdmin}
                  >
                    Update Profile
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

<Toaster position="top-center" richColors />

      </div>

    </div>
    </div >
  )
}

export default Adminprofile
