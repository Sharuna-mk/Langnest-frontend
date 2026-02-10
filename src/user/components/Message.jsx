import React, { useState } from 'react';
import Rightside from './Message/Rightside';
import Leftside from './Message/Leftside';


function Message() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <>
      <div className='w-300 h-screen sm:px-5 sm:py-10 -ml-50'>
        <div className="w-full border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid relative grid-cols-1 md:grid-cols-2">
          <Leftside selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
          <Rightside selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        </div>
      </div>
    </>
  );
}

export default Message;
