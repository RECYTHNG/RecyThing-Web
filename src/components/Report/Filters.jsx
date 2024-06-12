import { ConfigProvider, Select, DatePicker, Dropdown, Menu, Button } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { GoChevronDown } from "react-icons/go";
import { MdOutlineFilterAlt, MdOutlineCalendarMonth } from 'react-icons/md';

const Filters = ({ reportCategory, status, date, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [localReportCategory, setLocalReportCategory] = useState(reportCategory);
  const [localStatus, setLocalStatus] = useState(status);
  const [localDate, setLocalDate] = useState(date ? dayjs(date, "DD/MM/YYYY") : null);

  const handleFilter = () => {
    const formattedDate = localDate ? localDate.format("YYYY-MM-DD") : null;
    onFilterChange(localReportCategory, localStatus, formattedDate);
    setIsOpen(false)
  };

  const menu = (
    <Menu className='w-[250px]'>
      <div className='px-2'>
        <div>
          <div className="form-control">
            <label className="label">
              <span className="body-m font-bold">Report Category</span>
            </label>
            <Select
              suffixIcon={<GoChevronDown className='text-[#414141] text-lg' />}
              value={localReportCategory || 'None'}
              className='w-full'
              style={{
                height: "42px",
              }}
              onChange={(value) => setLocalReportCategory(value)}
              options={[
                {
                  value: 'rubbish',
                  label: 'Rubbish',
                },
                {
                  value: 'littering',
                  label: 'Littering',
                },
              ]}
            />
          </div>
        </div>
        <div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="body-m font-bold">Status</span>
            </label>
            <Select
              suffixIcon={<GoChevronDown className='text-[#414141] text-lg' />}
              value={localStatus || "Need Review"}
              className='w-full'
              style={{
                height: "42px",
              }}
              onChange={(value) => setLocalStatus(value)}
              options={[
                {
                  value: 'need review',
                  label: 'Need Review',
                },
                {
                  value: 'reject',
                  label: 'Rejected',
                },
                {
                  value: 'approve',
                  label: 'Accepted',
                },
              ]}
            />
          </div>
        </div>
        <div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="body-m font-bold">Date</span>
            </label>
            <DatePicker
              className="!text-[#888]"
              placeholder='DD/MM/YYYY'
              style={{
                height: "42px",
              }}
              format={"DD/MM/YYYY"}
              onChange={(date) => setLocalDate(dayjs(date, "DD/MM/YYYY"))}
              suffixIcon={<MdOutlineCalendarMonth className='text-[#414141] text-lg' />}
            />
          </div>
        </div>
        <div>
          <Button key={'submit'} className="btn mt-5 text-light-50 body-m bg-primary-500 hover:bg-primary-400 w-full" onClick={handleFilter}>
            Sort By Filter
          </Button>
        </div>
      </div>
    </Menu>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            colorTextPlaceholder: "#888",
            colorText: "#888",
          },
          Select: {
            colorText: "#888",
          },
        },
      }}
    >
      <Dropdown overlay={menu} open={isOpen} trigger={['click']} placement="bottomRight">
        <Button onClick={() => setIsOpen(!isOpen)} className="px-9 body-m flex items-center text-[#414141]">
          Filter
          <MdOutlineFilterAlt className="w-5 h-5 ml-2" />
        </Button>
      </Dropdown>
    </ConfigProvider>
  );
};

export default Filters;
