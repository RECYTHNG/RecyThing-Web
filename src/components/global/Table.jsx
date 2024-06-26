import { ConfigProvider, Table, Select, Pagination, Spin } from 'antd';
import React, { useState } from 'react';

const Tables = ({ data, columns, onRowClick, initialPageSize = 10, pagination, enableRowClick = false, onPageChange, isLoading=false }) => {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [current, setCurrent] = useState(1);

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrent(1);
    if (onPageChange) onPageChange(1, value);
  };

  const paginationConfig = {
    current: current,
    pageSize: pageSize,
    total: data.totalCount || data.length,
    showSizeChanger: false,
    onChange: (page) => {
      setCurrent(page);
      if (onPageChange) onPageChange(page, pageSize);
    },
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
      <Spin spinning={isLoading}>
        <Table
          className="mt-3"
          tableLayout="auto"
          dataSource={data.items || data}
          columns={columns}
          pagination={paginationConfig}
          scroll={{ x: 'max-content' }}
          rowKey="id"
          rowClassName={enableRowClick ? 'cursor-pointer' : 'cursor-default'}
          onRow={enableRowClick ?
            (record) => ({
              onClick: () => {
                onRowClick(record);
              }
            }) :
            null}
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
                Displays {((current - 1) * pageSize) + 1} to {Math.min(current * pageSize, data.totalCount)} data from a total of {data.totalCount} data
              </span>
            </div>
            <Pagination
              {...paginationConfig}
              style={{ display: 'flex', justifyContent: 'center' }}
            />
          </div>
        }
      </Spin>
    </ConfigProvider>
  );
};

export default Tables;
