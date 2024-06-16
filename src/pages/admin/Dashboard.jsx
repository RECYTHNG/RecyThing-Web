import React from 'react'
import ContentLayout from '../../layouts/ContentLayout'
import DoghnutChart from '../../components/Dashboard/DoghnutChart'
import PieChart from '../../components/Dashboard/PieChart'
import BarChart from '../../components/Dashboard/BarChart'
import LineChart from '../../components/Dashboard/LineChart'
import user from '/assets/svg/dashboard/user.svg'
import StatisticInformation from '../../components/Dashboard/StatisticInformation'

const Dashboard = () => {
  return (
    <ContentLayout title={"Dashboard"}>
      <div className='bg-[#F0F0F0] px-6 py-5 flex flex-col gap-5'>
        <div className='grid grid-cols-4 gap-7 font-poppins'>
          {[1, 2, 3, 4].map(data => (
            <StatisticInformation title={"User"} icon={user}/>
          ))}
        </div>
        <div className='flex gap-5'>
          <div className='flex-1'>
            <LineChart />
          </div>
          <DoghnutChart />
        </div>
        <BarChart />
        <PieChart />
      </div>
    </ContentLayout>
  )
}

export default Dashboard