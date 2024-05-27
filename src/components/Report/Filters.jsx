import { ConfigProvider, Select } from 'antd';
import React, { useState } from 'react';
import { GoChevronDown } from "react-icons/go";
import { MdOutlineFilterAlt } from 'react-icons/md';
import { DatePicker } from 'antd';
import { MdOutlineCalendarMonth } from "react-icons/md";

const Filters = () => {
  const [reportCategory, setReportCategory] = useState('None');
  const [status, setStatus] = useState('Need Review');
  const [date, setDate] = useState('12/12/2022');

  const handleFilter = () => {
    // Implement the filter logic here
    console.log({ reportCategory, status, date });
  };

  return (
    <ConfigProvider
    theme={{
      components: {
        DatePicker: {
          colorTextPlaceholder: "#888",
          colorText: "#888"
        },
        Select: {
          colorText: "#888"
        }
      }
    }}>
      <details className="dropdown dropdown-end text-[#414141]">
        <summary tabIndex={0} role="button" className="px-9 body-m flex items-center">
          Filter
          <MdOutlineFilterAlt className="w-5 h-5 ml-2" />
        </summary>
        <div tabIndex={0} className="dropdown-content z-10 menu p-2 shadow-filter bg-white rounded-[10px] w-64 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="body-m font-bold">Report Category</span>
            </label>
            <Select
              suffixIcon={<GoChevronDown className='text-[#414141] text-lg' />}
              defaultValue="rubbish"
              className='w-full'
              style={{
                height: "42px",
              }}
              options={[
                {
                  value: 'rubbish',
                  label: 'Rubbish',
                },
                {
                  value: 'littering',
                  label: 'Littering',
                },
              ]} />
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="body-m font-bold">Status</span>
            </label>
            <Select
              suffixIcon={<GoChevronDown className='text-[#414141] text-lg' />}
              defaultValue="review"
              className='w-full'
              style={{
                height: "42px",
              }}
              options={[
                {
                  value: 'review',
                  label: 'Need Review',
                },
                {
                  value: 'reject',
                  label: 'Rejected',
                },
                {
                  value: 'accept',
                  label: 'Accepted',
                },
              ]} />
          </div>
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
              suffixIcon={<MdOutlineCalendarMonth className='text-[#414141] text-lg' />} />
          </div>
          <button className="btn mt-5 text-light-50 body-m bg-primary-500 hover:bg-primary-400" onClick={handleFilter}>Sort By Filter</button>
        </div>
      </details>
    </ConfigProvider>
  );
};

export default Filters;