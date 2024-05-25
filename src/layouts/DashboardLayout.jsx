import React from 'react'
import Sidebar from '../components/global/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='h-screen w-screen flex text-black'>
      <Sidebar />
      <div className='flex flex-col flex-1 w-full h-screen overflow-x-auto'>
        <div className='w-full px-10 py-5 flex justify-end items-center bg-primary-500 text-white'>
          <div className='flex items-center gap-4 text-lg'>
            <div className='h-10 w-10 bg-gray-400 rounded-full'></div>
          </div>
        </div>
        <main className='overflow-y-auto flex-1 bg-tertiary text-[#444A6D] bg-white'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout