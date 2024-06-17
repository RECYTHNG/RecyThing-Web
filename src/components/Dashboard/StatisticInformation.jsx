import React from 'react'

const StatisticInformation = ({ icon, total, updatedData, dataName, description }) => {
  return (
    <div className='bg-white px-3 py-[10px] rounded-[10px]'>
      <div className='flex items-center justify-between'>
        <div className=''>
          <div className='text-base text-primary-300'>Total {dataName}</div>
          <div className='font-semibold text-xl text-dark-900'>{total} {dataName}</div>
        </div>
        <div className='h-[42px] w-[42px] bg-primary-500 rounded-full flex items-center justify-center'>
          <img src={icon} alt={dataName} />
        </div>
      </div>
      <div className='text-primary-300 text-sm mt-[6px]'><span className='text-success-300 font-semibold'>+{updatedData} {dataName}</span> {description}</div>
    </div>
  )
}

export default StatisticInformation