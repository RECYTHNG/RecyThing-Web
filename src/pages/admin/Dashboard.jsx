import React from 'react'
import ContentLayout from '../../layouts/ContentLayout'

const Dashboard = () => {
  return (
    <ContentLayout title={"Dashboard"}>
      <iframe className='w-full h-full p-6 bg-[#efefef]'
        width="600"
        height="450"
        src="https://lookerstudio.google.com/embed/reporting/8672c22e-ed7a-4e2b-85b9-eca574e35297/page/lR41D" frameborder="0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
      </iframe>
    </ContentLayout>
  )
}

export default Dashboard