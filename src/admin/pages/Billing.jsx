import React, { useEffect, useState } from 'react'
import visa from '../../assets/visa.png'
import { allUserAPI } from '../../services/allAPI';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { FaFileDownload } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Billing() {
  const [totalrevenue, setTotalRevenue] = useState(0)
  const [token, setToken] = useState('')
  const [userData, setUserData] = useState()
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //user Data
  const getUserData = async () => {

    const reqheaders = {
      authorization: `Bearer ${token}`
    }
    try {
      const response = await allUserAPI(reqheaders);
      console.log(response);
      setUserData(response.data.user)
      setTotalRevenue(Math.ceil((response.data.premiumUser) * 199))


    } catch (error) {
      console.log(error);

    }
  }

  //download pdf

   const[downloadStatus,setDownloadStatus]=useState(false)
    const downloadBilling=async()=>{
  
      // gerElement for screenshot
      const input=document.getElementById("result");
      const canvas=await html2canvas(input,{scale:2});
      const imgUrl=canvas.toDataURL('image/png')
  
      const pdf=new jsPDF('p', 'mm', 'a4')
      const pdfWidth=pdf.internal.pageSize.getWidth();
      const pdfHeight=pdf.internal.pageSize.getHeight();
      pdf.addImage(imgUrl,'PNG',0,0,pdfWidth,0);
      pdf.save('billing.pdf')
  
      //getdate
  
      const localTimeDate=new Date();
      const timeStamp=`${localTimeDate.toLocaleDateString()},${localTimeDate.toLocaleTimeString()}`
  
      try{
        const result=await addDownloadHistoryAPI({...userInput,imgUrl,timeStamp})
        console.log(result);
        setDownloadStatus(true)
        
      }
      catch(err){
        console.log(err);
        
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
      getUserData()

    }
  }, [token])
  return (
    <div>
      <div className='ms-80  -mt-35 me-5'>
        <div className="flex justify-between gap-5">
          <div className="card bg-white w-100 rounded-lg  shadow border border-gray-300 rounded-lg p-2">
            <h2 class="text-lg font-bold text-gray-800">
              Card Details
            </h2>
            <img src={visa} alt="" className='ms-2' />
          </div>

          <div className="card bg-white w-75 shadow border border-gray-300 rounded-lg p-2">
            <div className="flex flex-col items-center justify-center ">
              <img src="https://logos-marcas.com/wp-content/uploads/2021/03/Stripe-Emblema.png" className='w-30 h-20 mt-5' alt="" />
              <h1 className='text-xl font-bold text-center mt-5'>Stripe</h1>
              <hr className='w-50 text-gray-300 mt-5' />
              <span className='text-xl font-bold text-green-600 mt-5'>+{totalrevenue}</span>
            </div>
          </div>

          <div className="card bg-white w-120 shadow border border-gray-300 rounded-xl p-5">
            <div className="flex justify-between px-3">

              <h4 className='text-blue-900 text-md font-semibold'>Invoices</h4>
              <button className='border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white rounded-md px-2'>View All</button>
            </div>
            {userData?.map((item, index) => (
              item.isPremium &&
              <div
                key={item._id}
                className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >

                <div>
                  <div className='flex'>
                    <h4 className='text-lg font-medium text-gray-800 me-1'>{index + 1}.</h4>
                    <h5 className="text-lg font-medium text-gray-800">
                      {item.username}
                    </h5>

                  </div>
                  <p className="text-sm text-gray-500">
                    Visa •••• 1234
                  </p>
                </div>


                <button
                  className="text-blue-600 text-sm font-medium hover:text-blue-800 transition"
                  onClick={() => {
                    setSelectedUser(item);
                    setOpenModal(true);
                  }}
                >
                  View
                </button>
                <Modal
                  show={openModal}
                  onClose={() => setOpenModal(false)}
                  className="bg-gray-900/50"
                >
                  <ModalBody className="bg-white rounded-2xl" >
                    {selectedUser && (
                      <div className="max-w-md bg-white rounded-2xl ms-18">
                       <div className="flex justify-between items-center">
                         <h2 className="text-xl font-semibold text-gray-800 mb-5">
                          Billing Information
                        </h2>
                        <FaFileDownload className='text-xl' onClick={downloadBilling} />

                       </div >
                        {/* Card Holder */}
                        <div id='result'>
                          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-4" >
                          <div>
                            <p className="text-sm text-gray-500">Card Holder</p>
                            <p className="text-lg font-medium text-gray-800">
                              {selectedUser.username}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                            Active
                          </span>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Card Type</span>
                            <span className="font-medium text-gray-800">Visa</span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Card Number</span>
                            <span className="font-medium text-gray-800">
                              •••• •••• •••• 1234
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Billing Cycle</span>
                            <span className="font-medium text-gray-800">Monthly</span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-semibold text-gray-900">₹199</span>
                          </div>
                        </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end mt-6">
                          <button
                            onClick={() => setOpenModal(false)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </ModalBody>
                </Modal>

              </div>

            ))}
          </div>


        </div>
        {/* information */}
        <div className="bg-white max-w-md shadow-lg border border-gray-200 rounded-2xl p-6 mt-10">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Billing Information
          </h2>

          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            {userData?.map((item) => (
              item.isPremium &&
              <div
                key={item._id}
                className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >

                <div>
                  <h5 className="text-lg font-medium text-gray-800">
                    {item.username}
                  </h5>
                  <p className="text-sm text-gray-500">
                    Visa •••• 1234
                  </p>
                </div>


                <button className="text-red-500 text-sm font-medium hover:text-red-600 transition">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Billing
