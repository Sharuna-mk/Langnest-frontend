import React from 'react'
import paymentFailed from '../../../assets/PaymentFailed.gif'
import { Link } from 'react-router-dom'


function PaymentFailed() {
  return (
    <div>
         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
        
        {/* Content */}
        <div className="text-center">
          
          {/* Failed Icon */}
          <div className="flex items-center justify-center mb-4">
            <img
              src={paymentFailed}
              alt="Payment Failed"
              className="w-60 mx-auto"
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold text-red-700 dark:text-red-400">
            Payment Failed
          </h1>

          <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
            Unfortunately, your payment could not be processed.
          </p>

          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
            Please check your payment details or try again.
            If the issue persists, feel free to contact us.
           
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <Link
            to="/premium"
            className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-red-600 to-orange-500 hover:scale-105 hover:from-red-700 hover:to-orange-600"
          >
            Retry Payment
          </Link>

          <Link
            to="/"
            className="inline-block px-6 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Back to Home
          </Link>

        </div>
      </div>
    </div>
     
    </div>
  )
}

export default PaymentFailed
