import React, { useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import { shareContext } from '../../context/SearchContextShare';

function Search() {
  const {searchKey,setSearchKey} = useContext(shareContext)
  
  return (
    
    <div className='mt-10 flex justify-center'>
      <form class="form relative">
        <button class="absolute left-2 -translate-y-1/2 top-1/2 p-1">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
            class="w-5 h-5 text-gray-700"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              stroke-width="1.333"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <input
          class="input  w-150 rounded-full px-8 py-3 border-2 border-gray-500 shadow focus:outline-none focus:border-blue-500 placeholder-gray-500 text-black dark:text-white transition-all duration-300  dark:bg-black  shadow-md"
          placeholder="Search..."
          aria-label="Search posts and users"
          role="searchbox"
          type="text"
          onChange={(e)=> setSearchKey(e.target.value)}
        />
        <button type="reset" class="absolute right-3 -translate-y-1/2 top-1/2 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </form>

    </div>
  )
}

export default Search
