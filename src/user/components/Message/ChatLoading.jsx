import React from 'react'

function ChatLoading() {
  return (
    <div>
       <div
      role="status"
      className="max-w-lg p-4  divide-y divide-gray-200 rounded-lg shadow animate-pulse md:p-6"
    >
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex items-center justify-between py-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
            <div className="h-2 bg-gray-300 rounded-full w-32"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        </div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
    </div>
  )
}

export default ChatLoading
