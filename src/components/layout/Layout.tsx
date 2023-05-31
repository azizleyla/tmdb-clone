import React, { ReactNode } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout