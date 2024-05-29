import { useMemo } from 'react';
import ContentLayout from '../../layouts/ContentLayout';
import AddButton from '../../components/global/button/AddButton';
import Tables from '../../components/global/Table';
import { Button, Dropdown, Menu, Tag, message, Space } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { HiDotsHorizontal } from 'react-icons/hi';

const getStatusColor = (status) => {
  switch (status) {
    case 'Melewati':
      return 'bg-danger-500 text-white';
    case 'Selesai':
      return 'bg-success-500 text-white';
    default:
      return '';
  }
};

const handleMenuClick = (e) => {
  console.log('click', e.key);
};

const MissionList = () => {
  const data = useMemo(
    () => [
      { id: 'TM01', name: 'Daur Ulang Plastik', creator: 'Admin 1', deadline: '01/01/2024', status: 'Selesai' },
      { id: 'TM02', name: 'Pengumpulan Kertas', creator: 'Admin 2', deadline: '05/01/2024', status: 'Melewati' },
      { id: 'TM03', name: 'Pemisahan sampah', creator: 'Admin 3', deadline: '10/01/2024', status: 'Selesai' },
      { id: 'TM04', name: 'Edukasi Lingkungan', creator: 'Admin 2', deadline: '15/01/2024', status: 'Selesai' },
      { id: 'TM05', name: 'Pengurangan Limbah', creator: 'Admin 2', deadline: '20/01/2024', status: 'Selesai' },
      { id: 'TM06', name: 'Daur Ulang Kaca', creator: 'Admin 3', deadline: '25/01/2024', status: 'Selesai' },
      { id: 'TM07', name: 'Daur Ulang Baterai', creator: 'Admin 1', deadline: '30/01/2024', status: 'Selesai' },
      { id: 'TM08', name: 'Pengolahan Limbah Industri', creator: 'Admin 1', deadline: '01/02/2024', status: 'Selesai' },
      { id: 'TM09', name: 'Daur Ulang Elektronik', creator: 'Admin 3', deadline: '05/02/2024', status: 'Selesai' },
      { id: 'TM10', name: 'Pemanfaatan Limbah Organik', creator: 'Admin 3', deadline: '10/02/2024', status: 'Selesai' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', key: 'id', align: 'center', width: 177 },
      { title: 'Nama Misi', dataIndex: 'name', key: 'name' },
      { title: 'Pembuat Misi', dataIndex: 'creator', key: 'creator', align: 'center' },
      { title: 'Batas Akhir', dataIndex: 'deadline', key: 'deadline', align: 'center' },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (status) => (
          <Tag className={`${getStatusColor(status)} rounded-full border-none px-5 py-[2px] text-base`}>{status}</Tag>
        ),
      },
      {
        title: 'Aksi',
        key: 'action',
        render: (_, record) => {
          const menuItems = [
            {
              label: <span type="text">Edit</span>,
              icon: <EditOutlined />,
              key: 'edit',
            },
            {
              label: <span type="text">Detail</span>,
              icon: <EyeOutlined />,
              key: 'detail',
            },
            {
              label: <span type="text">Hapus</span>,
              icon: <DeleteOutlined />,
              key: 'delete',
            },
          ];

          const menuProps = {
            items: menuItems,
            onClick: handleMenuClick,
          };

          return (
            <Dropdown menu={menuProps} trigger={['click']} overlayClassName='text-lg'>
              <div className='cursor-pointer'>
                <HiDotsHorizontal className='text-black' />
              </div>
            </Dropdown>
          );
        }
      },
    ],
    []
  );

  return (
    <ContentLayout title={"Management Task"}>
      <div className='py-9 px-4'>
        <div className='w-full flex justify-end pb-4'>
          <AddButton text={"Tambah"} />
        </div>
        <Tables
          pagination={true}
          initialPageSize={10}
          data={data}
          columns={columns}
        />
      </div>
    </ContentLayout>
  );
};

export default MissionList;
