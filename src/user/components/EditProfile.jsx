import React from 'react'
import { IoChevronForward } from "react-icons/io5";

function EditProfile() {
  return (
    <div>
        <div className=" mt-30 me-10">
                <div className="flex justify-center">
        
              
                <div className="feature mt-10 p-5 -ms-5 bg-gray-300 shadow dark:bg-cardPrimary-dark text-black  dark:text-white">
                 <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
  {/* Header */}
  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
    Edit Profile
  </h2>

  {/* Profile Image */}
  <div className="flex flex-col items-center mb-6">
    <div className="relative">
      <img
        src="https://via.placeholder.com/100"
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
      />
      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700">
        <input type="file" className="hidden" />
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
        placeholder="Enter email"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Actions */}
    <div className="flex justify-end gap-3 pt-4">
      <button
        type="button"
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  </form>
</div>

                </div>
               </div>
                 </div>
      
    </div>
  )
}

export default EditProfile
