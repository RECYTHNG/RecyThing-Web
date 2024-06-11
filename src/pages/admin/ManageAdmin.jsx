import React, { useMemo, useState } from 'react';
import { Modal, Tag, Dropdown, Menu, Button } from 'antd';
import { useFetch } from '../../hooks/useFetch';
import Tables from '../../components/global/Table';
import AddAdminForm from '../../components/admin/addform';
import EditAdminForm from '../../components/admin/editform';
import ContentLayout from '../../layouts/ContentLayout';
import { toast } from 'react-toastify';
import HorizontalDotsIcon from '../../assets/moreicons';
import Edit from '../../assets/edit.svg';
import Delete from '../../assets/trash.svg';
import { DeleteModal } from '../../components/admin/modaldelete';
import AddButton from '../../components/global/button/AddButton';

const getRoleColor = (role) => {
  switch (role) {
    case 'Super Admin':
      return 'bg-sky-700 text-white';
    case 'Admin':
      return 'bg-sky-400 text-white';
    default:
      return '';
  }
};

const ManageAdmin = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { data: adminData, isLoading } = useFetch('/admins?page=1&limit=10', 'admins');
  const data = useMemo(
    () =>
      adminData?.data?.map((admin) => ({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        password: admin.password,
        role: admin.role,
        profile_photo: admin.profile_photo,
      })) || [],
    [adminData]
  );

  const columns = useMemo(
    () => [
      { title: 'Admin ID', dataIndex: 'id', key: 'id', align: 'center' },
      { title: 'Name', dataIndex: 'name', key: 'name', align: 'center' },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
      },
      {
        title: <div className="text-center">Status</div>,
        dataIndex: 'role',
        key: 'role',
        render: (role) => <Tag className={`${getRoleColor(role)} rounded-[42px] border-none px-5 py-[0.5px] text-base`}>{role}</Tag>,
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (record) => (
          <Dropdown
            overlay={
              <Menu className="w-26 px-4 p-2.5 bg-white rounded-[5px] shadow flex-col justify-start items-center inline-flex">
                <Menu.Item key="edit" onClick={() => showEditModal(record)}>
                  <div className="w-[80px] h-[30px] px-1.5 py-0.5 rounded gap-2.5 inline-flex items-center">
                    <img src={Edit} alt="Edit" className="w-4 h-4" />
                    <div className="text-black text-base font-normal leading-relaxed">Edit</div>
                  </div>
                </Menu.Item>
                <Menu.Item key="delete" onClick={() => showDeleteModal(record)}>
                  <div className="w-[80px] h-[30px] px-1.5 py-0.5 rounded gap-2.5 inline-flex items-center">
                    <img src={Delete} alt="Delete" className="w-4 h-4" />
                    <div className="text-black text-base font-normal leading-relaxed">Hapus</div>
                  </div>
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            placement="bottom"
          >
            <Button icon={<HorizontalDotsIcon />} />
          </Dropdown>
        ),
      },
    ],
    []
  );

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddOk = () => {
    setIsAddModalVisible(false);
    toast.success('Data added successfully', {
      position: 'top-right',
      autoClose: 2000,
      style: {
        marginTop: '90px',
      },
    });
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const showEditModal = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
    setSelectedAdmin(null);
    toast.success('Data saved successfully', {
      position: 'top-right',
      autoClose: 2000,
      style: {
        marginTop: '90px',
      },
    });
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedAdmin(null);
  };

  const showDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(false);
    setSelectedAdmin(null);
    toast.error('Data has been deleted', {
      position: 'top-right',
      autoClose: 2000,
      style: {
        marginTop: '90px',
      },
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setSelectedAdmin(null);
  };

  return (
    <ContentLayout title={'Manage Admin'}>
      <div className="px-6 py-9">
        <div className="flex items-end justify-end text-[#414141]">
          <AddButton text="Tambah" onClick={showAddModal} />
        </div>
        <div className="px-6 py-3 rounded-lg shadow mt-6">
          <Tables data={data} columns={columns} pagination={true} initialPageSize={10} isLoading={isLoading} />
        </div>
        <Modal open={isAddModalVisible} onCancel={handleAddCancel} footer={null} width={730}>
          <AddAdminForm onAdd={handleAddOk} onCancel={handleAddCancel} />
        </Modal>
        <Modal open={isEditModalVisible} onCancel={handleEditCancel} footer={null} width={730}>
          <EditAdminForm admin={selectedAdmin} onEdit={handleEditOk} onCancel={handleEditCancel} />
        </Modal>
        <DeleteModal isVisible={isDeleteModalVisible} onOk={handleDelete} onCancel={handleCancelDelete} record={selectedAdmin} />
      </div>
    </ContentLayout>
  );
};

export default ManageAdmin;
