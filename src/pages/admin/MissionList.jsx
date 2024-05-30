import { useMemo, useState } from 'react';
import ContentLayout from '../../layouts/ContentLayout';
import AddButton from '../../components/global/button/AddButton';
import Tables from '../../components/global/Table';
import { Button, Dropdown, Menu, Tag, message, Space, Modal, Input, Form, Upload } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { HiDotsHorizontal } from 'react-icons/hi';
import FloatingLabelInput from '../../components/global/input/FloatingInput';

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

const ModalContent = () => {
  const [stages, setStages] = useState([{ title: '', description: '' }]);

  const addStage = () => {
    setStages([...stages, { title: '', description: '' }]);
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item>
          <Upload.Dragger name="files" accept=".jpg,.png" maxCount={1} beforeUpload={() => false}>
            <p className="ant-upload-drag-icon">
              <img src="your-image-url" alt="Uploaded" style={{ maxWidth: '100%' }} />
            </p>
            <p className="ant-upload-text">ubah gambar <a href="#">Browse</a></p>
            <p className="ant-upload-hint">Max 200MB, JPG/PNG</p>
          </Upload.Dragger>
        </Form.Item>

        {stages.map((stage, index) => (
          <div key={index}>
            <FloatingLabelInput
              id="name"
              label="Nama Misi"
              placeholder="Masukan Misi"
            />
            <FloatingLabelInput
              id="description"
              label="Deskripsi"
              placeholder="Masukan Deskripsi"
              type='date'
            />
          </div>
        ))}

        <Button type="dashed" onClick={addStage} block icon={<PlusOutlined />}>
          Tambah Tahapan Misi
        </Button>
      </Form>
    </div>
  );
};

const MissionList = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleMenuClick = (e) => {
    console.log('click', e.key);
  };

  return (
    <ContentLayout title={"Management Task"}>
      <div className='py-9 px-4'>
        <div className='w-full flex justify-end pb-4'>
          <AddButton text={"Tambah"} onClick={() => setIsModalVisible(true)} />
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
        // onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        closable={false}
        title={<h2 className='font-bold h4'>Tambah Data Misi</h2>}
        styles={{
          content: {
            padding: '20px 24px',
          },
        }}
        footer={[
          <Button key="submit" className="text-base rounded-[4px] bg-success-400 hover:bg-success-500 py-1 px-[6px] text-white border-none" onClick={() => setIsModalVisible(false)}>
            Approve
          </Button>,
          <Button key="button" className="text-base rounded-[4px] bg-danger-500 hover:bg-danger-600 py-1 px-[6px] text-white border-none" onClick={() => setIsModalVisible(false)}>
            Reject
          </Button>,
        ]}
      >
        <ModalContent />
      </Modal>
    </ContentLayout>
  );
};

export default MissionList;
