import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa6";
import notification from "/assets/svg/notification.svg"
import { Avatar, Input } from 'antd';
import { IoPersonSharp } from 'react-icons/io5';
import { useFetch } from '../hooks/useFetch';

const ContentLayout = ({ children, title }) => {
  const { data: adminData, isLoading, isError } = useFetch('/admin/profile');
  console.log(adminData)

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      {!isLoading ?
        <header className='w-full p-5 flex justify-between items-center bg-white text-[#151D48]'>
          <h1 className='h4 font-semibold'>{title}</h1>
          <div className='flex items-center gap-5'>
            <div className='min-w-12 h-12 flex items-center justify-center bg-[#EFEFEF] rounded-lg'>
              <img src={notification} />
            </div>
            <div className='flex items-center gap-4'>
              <Avatar
                size={{ xs: 24, sm: 28, md: 32, lg: 40, xl: 44, xxl: 50 }}
                icon={<IoPersonSharp />}
              />
              <div className='flex flex-col'>
                <div className='flex items-center gap-6'>
                  <span className='body-m font-medium'>{adminData.data.name}</span>
                  <FaChevronDown className='text-sm' />
                </div>
                <span className='body-s text-[#737791]'>{adminData.data.role}</span>
              </div>
            </div>
          </div>
        </header>
        :
        <div className='w-full h-20 bg-gray-300 animate-pulse'>

        </div>
      }
      <main className='overflow-y-auto flex-1 bg-tertiary text-[#444A6D] bg-white'>
        {children}
      </main>
    </>
  )
}

export default ContentLayout