import { useMemo, useState } from 'react';
import { Tag, Dropdown } from 'antd';
import ContentLayout from '../../layouts/ContentLayout';
import AddButton from '../../components/global/button/AddButton';
import Tables from '../../components/global/Table';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { HiDotsHorizontal } from 'react-icons/hi';
import AddTaskModal from '../../components/task/management/AddTaskModal';
import { useDeleteData, useFetch } from '../../hooks/useFetch';
import dayjs from 'dayjs';
import DetailTaskModal from '../../components/task/management/DetailTaskModal';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/global/Modal/DeleteModal';

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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState('')
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data: taskData, isLoading, isError } = useFetch(`/tasks?page=${currentPage}&limit=${pageSize}`, 'task')
  const { mutateAsync: deleteTask } = useDeleteData()

  const data = useMemo(
    () =>
      taskData?.data?.map((task) => ({
        id: task.id,
        name: task.title,
        description: task.description,
        creator: task.task_creator.name,
        startDate: dayjs(task.start_date).format("DD/MM/YYYY"),
        deadline: dayjs(task.end_date).format("DD/MM/YYYY"),
        status: task.status ? 'Aktif' : 'Melewati',
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
              onClick: () => handleDetail(record),
            },
            {
              label: <span type="text">Hapus</span>,
              icon: <DeleteOutlined />,
              key: 'delete',
              onClick: () => handleDelete(record.id),
            },
          ];

          const menuProps = {
            items: menuItems,
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

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleEdit = (record) => {
    setSelectedTask(record);
    setIsEditModalVisible(true);
  };

  const handleDetail = (record) => {
    setSelectedTask(record);
    setIsDetailModalVisible(true);
  };

  const handleDelete = (id) => {
    setIdToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const handleOkDelete = () => {
    toast.loading("Sedang Menghapus Data");
    deleteTask({endpoint: `tasks/${idToDelete}`})
    .then((_) => {
      toast.dismiss();
      setIsDeleteModalVisible(false);
      toast.success("Data Berhasil Dihapus")
    }
    ).catch(() => {
      toast.dismiss();
      toast.error("Terjadi Kesalahan Ketika Menghapus Data")
    })
  }

  const handleAddData = () => {
    setIsEditModalVisible(true)
    setSelectedTask('')
  }

  const handleCloseModal = () => {
    setIsEditModalVisible(false);
    setSelectedTask(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
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
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>
      <AddTaskModal isOpen={isEditModalVisible} onClose={handleCloseModal} selectedTask={selectedTask} />
      <DetailTaskModal isOpen={isDetailModalVisible} onClose={handleCloseDetailModal} selectedTask={selectedTask} />
      <DeleteModal isVisible={isDeleteModalVisible} onOk={handleOkDelete} onCancel={() => setIsDeleteModalVisible(false)}/>
    </ContentLayout>
  );
};

export default MissionList;
