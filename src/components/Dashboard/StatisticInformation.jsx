import React from 'react'

const StatisticInformation = ({ icon, data, title }) => {
  return (
    <div className='bg-white px-3 py-[10px] rounded-[10px]'>
      <div className='flex items-center justify-between'>
        <div className=''>
          <div className='text-base text-primary-300'>Total {title}</div>
          <div className='font-semibold text-xl text-dark-900'>200 {title}</div>
        </div>
        <div className='h-[42px] w-[42px] bg-primary-500 rounded-full flex items-center justify-center'>
          <img src={icon} alt={title} />
        </div>
      </div>
      <div className='text-primary-300 text-sm mt-[6px]'><span className='text-success-300 font-semibold'>+12 user</span> since yesterday</div>
    </div>
  )
}

export default StatisticInformation