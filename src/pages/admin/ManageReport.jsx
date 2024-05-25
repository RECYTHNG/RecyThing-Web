import React, { useMemo, useState } from 'react';
import { Tag } from 'antd';
import Filters from '../../components/Report/Filters';
import Tables from '../../components/global/Table';

const ManageReport = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ category: '', status: '', date: null });

  const data = useMemo(
    () => [
      { id: 'RPT001', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Need Review', date: '12/12/2022', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT002', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Need Review', date: '22/12/2021', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT003', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Rejected', date: '31/12/2023', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT004', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Rejected', date: '21/12/2033', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT005', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Accepted', date: '11/12/2012', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT006', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Accepted', date: '19/12/2011', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT007', name: 'Harry Gani Darmawan', category: 'Littering', status: 'Accepted', date: '02/12/2041', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT008', name: 'Harry Gani Darmawan', category: 'Rubbish', status: 'Rejected', date: '05/12/2002', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT009', name: 'Harry Gani Darmawan', category: 'Littering', status: 'Rejected', date: '03/12/2003', location: 'Cimahi, Jawa Barat' },
      { id: 'RPT010', name: 'Harry Gani Darmawan', category: 'Littering', status: 'Rejected', date: '10/12/2041', location: 'Cimahi, Jawa Barat' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { title: 'Report ID', dataIndex: 'id', key: 'id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Report Category', dataIndex: 'category', key: 'category' },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
          <Tag className={`${getStatusColor(status)} rounded-full border-none px-5 py-[2px] text-base`}>{status}</Tag>
        ),
      },
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Location', dataIndex: 'location', key: 'location' },
    ],
    []
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Need Review':
        return 'bg-yellow-500 text-white';
      case 'Rejected':
        return 'bg-red-500 text-white';
      case 'Accepted':
        return 'bg-green-500 text-white';
      default:
        return '';
    }
  };

  const toggleFilter = () => setFilterVisible(!filterVisible);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="px-6 py-9">
      <div className='flex items-end justify-between text-[#414141]'>
        <h1 className="h4 font-semibold mb-4">Manage Report</h1>
        <Filters />
      </div>
        
        <Tables data={data} columns={columns}/>
    </div>
  );
};

export default ManageReport;
