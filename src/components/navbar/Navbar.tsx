import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className='bg-[#042541] h-16 flex  items-center justify-center  '>
            <ul className='flex text-white gap-7'>
                <li className='text-xl'><Link to='/movies'>Movies</Link></li>
                <li  className='text-xl'><Link to='tv-shows'>TV Shows</Link></li>
                <li  className='text-xl'><Link to='/people'>People</Link></li>
                <li  className='text-xl'><Link to='more'>More</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar