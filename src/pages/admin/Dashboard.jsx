import React from 'react'
import ContentLayout from '../../layouts/ContentLayout'
import DoghnutChart from '../../components/Dashboard/DoghnutChart'
import PieChart from '../../components/Dashboard/PieChart'
import BarChart from '../../components/Dashboard/BarChart'
import LineChart from '../../components/Dashboard/LineChart'

const Dashboard = () => {
  return (
    <ContentLayout title={"Dashboard"}>
      <DoghnutChart />
      <PieChart />
      <BarChart />
      <LineChart />
    </ContentLayout>
  )
}

export default Dashboard