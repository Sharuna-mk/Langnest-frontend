import React, { useContext, useState } from "react";
import { ChevronDownIcon, MagnifyingGlassIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { adminDeleteUserAPI, adminSearchUserAPI, allUserAPI } from "../../services/allAPI";
import userlogo from '../../assets/user.webp';
import { MdDelete } from "react-icons/md";
import { shareContext } from "../../context/SearchContextShare";
import { toast, Toaster } from 'sonner';


function Userlist() {

  const { searchKey, setSearchKey } = useContext(shareContext)
  const [userData, setUserData] = useState([])
  const [token, setToken] = useState()
  const tabs = ["All", "Pro", "Free"];
  const Tablehead = ["Username", "Subscription", "Language", "Date",];
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");


  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 3
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = userData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(userData.length / recordsPerPage)
  const [tempData, setTempData] = useState([])

  // all user
  const getUserList = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const response = await allUserAPI(reqHeader);
      console.log(response);
      setUserData(response.data.user)
      setTempData(response.data.user)

    } catch (error) {
      console.log(error);

    }
  }
  const getSearchList = async (searchKey) => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      if (search.trim === "") {
        getUserList()
      }
      const response = await adminSearchUserAPI(searchKey, reqHeader);
      console.log(response);
      setUserData(response.data)

    } catch (error) {
      console.log(error);

    }
  }

  const handleFilter = async (value) => {
    console.log(tempData);

    console.log(value);
    if (value == 'Pro') {
      console.log(tempData.filter(item => (item.isPremium) == true));
      setUserData(tempData.filter(item => (item.isPremium) == true))
    }
    else if (value == 'Free') {
      console.log(tempData.filter(item => (item.isPremium) == false));
      setUserData(tempData.filter(item => (item.isPremium) == false))
    }
    else {
      setUserData(tempData)
    }
  }

  const confirmDelete = (id) => {
    toast('Are you absolutely sure?', {
      description: 'This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: () => handleDelete(id),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => console.log('Cancelled'),
      },
    })
  }

  const handleDelete = async (id) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const result = await adminDeleteUserAPI(id, reqHeader)
      console.log(result);
      setUserData(prev => prev.filter(item => item._id !== id))

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    const userToken = sessionStorage.getItem("token")

    if (userToken) {
      setToken(userToken)

    }
  }, [])
  useEffect(() => {
    if (token) {
      getUserList()
    }
  }, [token])
  useEffect(() => {
    if (token) {
      getSearchList(searchKey)
    }
  }, [searchKey])




  const handlePrev = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNext = () => {
    if (currentPage < lastIndex) {
      setCurrentPage(currentPage + 1)
    }

  }

  return (
    <div className="p-6 ms-80 me-10 -mt-35">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Users List</h2>
          <p className="text-sm text-white">See information about all members</p>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2  rounded bg-white hover:bg-blue-800 text-sm hover:bg-blue-600 hover:text-white">View All</button>
          <button className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white  text-sm">
            <UserPlusIcon className="h-4 w-4" />
            Add Users
          </button>
        </div>
      </div>


      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}

              onClick={() => { handleFilter(tab), setActiveTab(tab) }}
              className={`px-3 py-1 rounded ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } text-md font-medium`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full md:w-64 relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchKey(e.target.value)}
            className="pl-10 pr-3 py-2 border border-gray-300 bg-white rounded w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-50">
            <tr>
              {Tablehead.map((head) => (
                <th key={head} className="px-4 py-2 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    {head} <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((user, id) => (
              <tr key={id} className={id % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {/* Username */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={user.profile || userlogo} alt={user.username} className="h-8 w-8 rounded-full" />
                  <div className="flex flex-col">
                    <span className="text-gray-800 text-sm font-medium">{user.username}</span>
                    <span className="text-gray-500 text-xs">{user.email}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${user.isPremium ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                  >
                    {user.isPremium ? "Pro" : "Free"}
                  </span>
                </td>

                {/* Reports / Subscription */}
                <td className="px-4 py-3 text-sm text-gray-700">
                  <div className="flex flex-col">
                    <span >{user.selectedLanguage}</span>
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-sm text-gray-700">{user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-GB")
                  : ""}</td>

                {/* Edit button */}
                <td className="px-4 py-3">
                  <button className="text-red-500 hover:text-red-700" onClick={() => { confirmDelete(user._id) }}>
                    <MdDelete className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}

            {userData.length === 0 && (
              <tr>
                <td colSpan={Tablehead.length} className="px-4 py-6 text-center text-gray-500 text-sm">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span className="text-gray-600">Page {currentPage} of {npage}</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >Previous</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === npage || npage === 0}
            onClick={handleNext}
          >Next</button>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>

  );
}

export default Userlist;