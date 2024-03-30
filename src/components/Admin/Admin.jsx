import React from 'react';
import { useState } from 'react'
import './Admin.css'
import AdminHeader from './AdminHeader'
import Sidebar from './Sidebar'
import AdminHome from './AdminHome'

const Admin = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <AdminHeader OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <AdminHome />
    </div>
  )
}

export default Admin;