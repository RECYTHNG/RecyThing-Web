import { ConfigProvider, Table, Select, Pagination } from 'antd';
import React, { useState } from 'react';

const Tables = ({ data, columns, showModal, initialPageSize = 10, pagination }) => {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [current, setCurrent] = useState(1);

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrent(1);
  };

  const paginationConfig = {
    current: current,
    pageSize: pageSize,
    total: data.length,
    showSizeChanger: false,
    onChange: (page) => setCurrent(page),
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            fontSize: '1rem',
            colorText: '#444A6D',
            headerColor: 'black',
            padding: 10,
          },
        },
      }}
    >
      <Table
        className="mt-3"
        tableLayout="auto"
        dataSource={data}
        columns={columns}
        pagination={paginationConfig}
        scroll={{ x: 'max-content' }}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            showModal(record);
          }
        })}
      />
      {pagination &&
        <div className='flex items-center justify-between mt-10'>
          <div className='flex items-center gap-4'>
            <span>Show </span>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              style={{ width: 70 }}
            >
              {[5, 10, 15].map(size => (
                <Select.Option key={size} value={size}>{size}</Select.Option>
              ))}
            </Select>
            <span>
              Displays {((current - 1) * pageSize) + 1} to {Math.min(current * pageSize, data.length)} data from a total of {data.length} data
            </span>
          </div>
          <Pagination
            {...paginationConfig}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        </div>
      }
    </ConfigProvider>
  );
};

export default Tables;