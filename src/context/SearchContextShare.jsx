import React, { useState } from 'react'
import { createContext } from "react";

export const shareContext = createContext()

function SearchContextShare({children}) {
    const [searchKey,setSearchKey] = useState()
    const [userChat, setUserChat] = useState([]);
  return (
    <shareContext.Provider value={{searchKey,setSearchKey,userChat,setUserChat }}>
        {
            children
        }
      
    </shareContext.Provider>
  )
}

export default SearchContextShare

