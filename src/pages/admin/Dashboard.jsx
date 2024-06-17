import React from 'react'
import ContentLayout from '../../layouts/ContentLayout'
import DoghnutChart from '../../components/Dashboard/DoughnutChart'
import PieChart from '../../components/Dashboard/PieChart'
import BarChart from '../../components/Dashboard/BarChart'
import LineChart from '../../components/Dashboard/LineChart'
import user from '/assets/svg/dashboard/user.svg'
import StatisticInformation from '../../components/Dashboard/StatisticInformation'
import { useFetch } from '../../hooks/useFetch'

const Dashboard = () => {
  const { data: dashboard, isLoading, isError } = useFetch('/dashboards', 'dashboard');
  const dashboardData = dashboard?.data;
  console.log(dashboardData)
  const dataStatistic = [
    {
      name: 'User',
      description: 'since yesterday',
      icon: user,
      total: dashboardData?.user?.total_user,
      updatedData: dashboardData?.user?.addition_user_since_yesterday ?? 0,
    },
    {
      name: 'Report',
      description: 'since yesterday',
      icon: user,
      total: dashboardData?.report?.total_report,
      updatedData: dashboardData?.report?.addition_report_since_yesterday ?? 0,
    },
    {
      name: 'Challange',
      description: 'Last week',
      icon: user,
      total: dashboardData?.challenge?.total_challenge,
      updatedData: dashboardData?.challenge?.addition_challenge_since_last_week ?? 0,
    },
    {
      name: 'Content',
      description: 'Today',
      icon: user,
      total: dashboardData?.content?.total_content,
      updatedData: dashboardData?.content?.addition_content_today ?? 0,
    },
  ]
  
  return (
    <ContentLayout title={"Dashboard"}>
      <div className='bg-[#F0F0F0] px-6 py-5 flex flex-col gap-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 font-poppins'>
          {dataStatistic.map(data => (
            <StatisticInformation
              dataName={data.name}
              description={data.description}
              icon={data.icon}
              total={data.total}
              updatedData={data.updatedData}
            />
          ))}
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <LineChart />
          </div>
          <DoghnutChart data={dashboardData?.user_achievement}/>
        </div>
        <BarChart />
        <div className='grid grid-cols-3 gap-5'>
          <PieChart />
          <PieChart />
          <PieChart />
        </div>
      </div>
    </ContentLayout>
  );
};

export default Dashboard;
