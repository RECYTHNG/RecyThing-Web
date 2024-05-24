import React from 'react'
import Sidebar from '../components/global/Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className='h-screen flex text-black'>
      <Sidebar />
      <div className='flex flex-col flex-1 h-screen'>
        <div className='w-full bg-W px-10 py-5 flex justify-end items-center bg-primary-500 text-white'>
          <div className='flex items-center gap-4 text-lg'>
            <div className='h-10 w-10 bg-gray-400 rounded-full'></div>
            {/* <IoMdNotificationsOutline className='text-3xl' /> */}
          </div>
        </div>
        <main className='overflow-y-auto flex-1 bg-tertiary text-white'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout