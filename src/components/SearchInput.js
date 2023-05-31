import React from 'react'
import {FaSearch} from "react-icons/fa"

const SearchInput = () => {
  return (
    <div className='flex items-center gap-1 mb-3' >
        <FaSearch className='text-white text-2xl'/>
   <input className='outline-none text-white bg-transparent p-2' type="text" placeholder='Search for movies or TV series'/>
   </div>
  )
}

export default SearchInput