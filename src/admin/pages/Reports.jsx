import React, { useEffect, useState } from 'react'
import { allReportsAPI, deleteReportsAPI, ignoreReportsAPI } from '../../services/allAPI'
import { toast, Toaster } from 'sonner';

function Reports() {

  const [token, setToken] = useState('')
  const [reportData, setReportData] = useState([])
  const [postUrl, setPostUrl] = useState('')
  const getReportData = async () => {

    const reqheaders = {
      authorization: `Bearer ${token}`
    }
    try {
      const response = await allReportsAPI(reqheaders);
      console.log(response);
      setReportData(response.data.reportsCount)


    } catch (error) {
      console.log(error);

    }
  }

  const handleCopy = (postId) => {

    const url = `${window.location.origin}/posts/${postId}`;
    setPostUrl(url)
    window.open(url, "_blank")
  }

  //ignore
  const handleIgnore = async (postId) => {
    const reqheaders = {
      authorization: `Bearer ${token}`
    }

    try {
      const response = await ignoreReportsAPI({ postId }, reqheaders)
      console.log(response);
      if (response.status == 200) {
        toast.success(response.data.message, {
          duration: 2000,
        });

        setReportData(prev => prev.filter(item => item._id !== postId))
      }

    } catch (error) {
      console.log(error);

    }

  }
  //delete Report + post
  const handleDelete = async (postId) => {
    const reqheaders = {
      authorization: `Bearer ${token}`
    }
    try {
      const response = await deleteReportsAPI( postId , reqheaders)
      console.log(response);
      if (response.status == 200) {
        toast.success(response.data.message, {
          duration: 2000,
        });
        setReportData(prev => prev.filter(item => item._id !== postId))
      }

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
      getReportData()
    }
  }, [token])

  return (
    <div className='ms-80 -mt-35 me-10'>
      <div className="card bg-white w-auto shadow border border-gray-300 rounded-lg p-10">
        <h1 className='text-xl font-semibold text-red-500'> Active Reports</h1>
        <table className="w-full table-auto text-left mt-10 " >
          <thead >
            <tr>
              <th className='ps-3'>Sl.No</th>
              <th>Username</th>
              <th>Email</th>
              <th>No.of reports</th>
              <th>Reason</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>

            {
              reportData.map((item, index) => {
                return <tr key={index} className='bg-white border border-gray-200'>
                  <td className='p-3'>{index + 1}</td>
                  <td >{item.username}</td>
                  <td >{item.email}</td>
                  <td className='text-center'>{item.reportCount}</td>
                  <td className='gap-3'>{
                    item.reasons.map((item) => {
                      return <div className='text-sm text-red-500'>{item}</div>
                    })
                  }</td>
                  <td
                    onClick={() => handleCopy(item._id)} className='cursor-pointer text-blue-500'>Link</td>
                  <td><button className='text-red-500' onClick={() => { handleDelete(item._id) }}>Remove</button>
                    <button className='text-gray-500 ms-5' onClick={() => handleIgnore(item._id)}>Ignore</button>
                  </td>
                </tr>


              })
            }


          </tbody>
        </table>
        <Toaster position="top-center" richColors />
      </div>
    </div>
  )
}

export default Reports
