import React from 'react'
import Sidebar from '../components/global/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='h-screen w-screen flex text-black'>
      <Sidebar />
      <div className='flex flex-col flex-1 w-full h-screen overflow-x-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout