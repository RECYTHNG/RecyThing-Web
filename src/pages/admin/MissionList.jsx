import { useMemo, useState } from 'react';
import ContentLayout from '../../layouts/ContentLayout';
import AddButton from '../../components/global/button/AddButton';
import Tables from '../../components/global/Table';
import { Button, Dropdown, Menu, Tag, message, Space, Modal, Input, Form, Upload } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { HiDotsHorizontal } from 'react-icons/hi';
import AddTaskModal from '../../components/task/management/AddTaskModal';
import { useFetch } from '../../hooks/useFetch';
import dayjs from 'dayjs';

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
  const { data: taskData, isLoading, isError } = useFetch('/tasks?page=1&limit=10', 'task')

  const data = useMemo(
    () => 
      taskData?.data?.map((task) => ({
        id: task.id,
        name: task.title,
        description: task.description,
        creator: task.task_creator.name,
        startDate: dayjs(task.start_date).format("DD/MM/YYYY"),
        deadline: dayjs(task.end_date).format("DD/MM/YYYY"),
        status: task.status ? 'Aktif' : 'Tidak Aktif',
        point: task.point,
        stages: task.steps,
        thumbnail: task.thumbnail,
      })) || [],
    [taskData]
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
    setIsModalVisible(true);
  };

  const handleAddData = () => {
    setIsModalVisible(true)
    setSelectedTask('')
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
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
          data={{ items: data, totalCount: taskData?.total_data || 0 }}
          columns={columns}
          isLoading={isLoading}
        />
      </div>
      <AddTaskModal isOpen={isModalVisible} onClose={handleCloseModal} selectedTask={selectedTask}/>
    </ContentLayout>
  );
};

export default MissionList;
