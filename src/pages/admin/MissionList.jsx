import { useMemo, useState } from 'react';
import ContentLayout from '../../layouts/ContentLayout';
import AddButton from '../../components/global/button/AddButton';
import Tables from '../../components/global/Table';
import { Button, Dropdown, Menu, Tag, message, Space, Modal, Input, Form, Upload } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { HiDotsHorizontal } from 'react-icons/hi';
import AddTaskModal from '../../components/task/management/AddTaskModal';

const getStatusColor = (status) => {
  switch (status) {
    case 'Melewati':
      return 'bg-danger-500 text-white';
    case 'Aktif':
      return 'bg-success-500 text-white';
    default:
      return '';
  }
};

const MissionList = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stages, setStages] = useState([{ title: '', description: '' }]);

  const data = useMemo(
    () => [
      { id: 'TM01', name: 'Daur Ulang Plastik', creator: 'Admin 1', deadline: '01/01/2024', status: 'Aktif' },
      { id: 'TM02', name: 'Pengumpulan Kertas', creator: 'Admin 2', deadline: '05/01/2024', status: 'Melewati' },
      { id: 'TM03', name: 'Pemisahan sampah', creator: 'Admin 3', deadline: '10/01/2024', status: 'Aktif' },
      { id: 'TM04', name: 'Edukasi Lingkungan', creator: 'Admin 2', deadline: '15/01/2024', status: 'Aktif' },
      { id: 'TM05', name: 'Pengurangan Limbah', creator: 'Admin 2', deadline: '20/01/2024', status: 'Aktif' },
      { id: 'TM06', name: 'Daur Ulang Kaca', creator: 'Admin 3', deadline: '25/01/2024', status: 'Aktif' },
      { id: 'TM07', name: 'Daur Ulang Baterai', creator: 'Admin 1', deadline: '30/01/2024', status: 'Aktif' },
      { id: 'TM08', name: 'Pengolahan Limbah Industri', creator: 'Admin 1', deadline: '01/02/2024', status: 'Aktif' },
      { id: 'TM09', name: 'Daur Ulang Elektronik', creator: 'Admin 3', deadline: '05/02/2024', status: 'Aktif' },
      { id: 'TM10', name: 'Pemanfaatan Limbah Organik', creator: 'Admin 3', deadline: '10/02/2024', status: 'Aktif' },
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
              onClick: () => handleEdit(record),
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

  const handleMenuClick = (e) => {
    console.log('click', e.key);
  };

  const handleEdit = (record) => {
    setSelectedTask(record);
    setStages(record.stages || [{ title: '', description: '' }]);
    setIsModalVisible(true);
  };

  const handleStageChange = (index, key, value) => {
    const newStages = [...stages];
    newStages[index][key] = value;
    setStages(newStages);
  };
  
  const handleAddData = () => {
    setIsModalVisible(true)
    setSelectedTask('')
    setStages([{ title: '', description: '' }])
  }

  const addStage = () => {
    setStages([...stages, { title: '', description: '' }]);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
    setStages([{ title: '', description: '' }]);
  };

  return (
    <ContentLayout title={"Management Task"}>
      <div className='py-9 px-4'>
        <div className='w-full flex justify-end pb-4'>
          <AddButton text={"Tambah"} onClick={handleAddData} />
        </div>
        <Tables
          pagination={true}
          initialPageSize={10}
          data={data}
          columns={columns}
        />
      </div>
      <Modal
        open={isModalVisible}
        width={890}
        centered
        // onOk={handleOk}
        onCancel={handleCloseModal}
        closable={false}
        title={<h2 className='font-bold h4'>Tambah Data Misi</h2>}
        styles={{
          content: {
            padding: '20px 24px',
          },
        }}
        footer={[
          <Button key="close" className="btn-m font-bold text-primary-500 h-[42px] px-[22px] rounded-[5px] border border-primary-500" onClick={() => setIsModalVisible(false)}>
            Kembali
          </Button>,
          <Button key="button" className="btn-m font-bold text-white h-[42px] px-[22px] rounded-[5px] bg-primary-500" onClick={() => setIsModalVisible(false)}>
            {selectedTask ? 'Simpan' : 'Tambah'}
          </Button>,
        ]}
      >
        <AddTaskModal isOpen={isModalVisible} selectedTask={selectedTask} onStageChange={handleStageChange} stages={stages} addStage={addStage} />
      </Modal>
    </ContentLayout>
  );
};

export default MissionList;
