import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import paymentSucess from '../../../assets/CompletedSuccessfully.gif';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UpdatePremiumAPI } from '../../../services/allAPI';
import { useState } from 'react';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
    const [token, setToken] = useState('')


     const updatePremiumStatus = async (sessionId) => {
      if (!sessionId) return;
   
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };
      try {
        const response = await UpdatePremiumAPI({sessionId},reqHeader)
        console.log(response);
      } catch (err) {
        console.error("Failed to update premium status:", err);
      }
    };


      useEffect(() => {
        const userToken = sessionStorage.getItem("token")
        
        if (userToken) {
          setToken(userToken)  
        }
    
      }, [])
        useEffect(() => {
   if(token){
     updatePremiumStatus(sessionId);
   }
      }, [token,sessionId]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <img src={paymentSucess} alt="Payment Success" />
          </div>

          <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
            Payment Successful!
          </h1>

          <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
            Thank you for your purchase.
          </p>

          <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
            If you have any questions or need further assistance, feel free to{" "}
            <a
              href="mailto:admin@eliteai.tools"
              className="font-medium text-indigo-600 underline dark:text-indigo-400"
            >
              contact us
            </a>.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
