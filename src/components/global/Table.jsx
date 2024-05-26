import { ConfigProvider, Table } from 'antd'
import React from 'react'

const Tables = ({data, columns, showModal}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            fontSize: "1rem",
            colorText: "#444A6D",
            headerColor: "black",
            padding: 10
          },
        },
      }}>
      <Table
        className='mt-3'
        tableLayout='auto'
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            showModal(record)
          }
        })}
      />
    </ConfigProvider>
  )
}

export default Tables