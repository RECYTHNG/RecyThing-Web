import React, { useMemo, useState } from 'react';
import { Modal, Tag, Dropdown, Menu, Button } from 'antd';
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

const ManageAdmin = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [admins, setAdmins] = useState([
    { id: 'AD001', name: 'Dono Torreto', email: 'donotorreto77@gmail.com', status: 'Super Admin' },
    { id: 'AD002', name: 'Rama Riskynama', email: 'riskyramanama@gmail.com', status: 'Admin' },
    { id: 'AD003', name: 'Darmo Asgarita', email: 'darmociimoetsclalu@gmail.com', status: 'Admin' },
    { id: 'AD004', name: 'Joko Anwar', email: 'jokoanwar@gmail.com', status: 'Admin' },
    { id: 'AD005', name: 'Tara Basro', email: 'tarabasro@gmail.com', status: 'Admin' },
  ]);

  const renderStatus = (status) => {
    switch (status) {
      case 'Super Admin':
        return 'bg-sky-700 text-white';
      case 'Admin':
        return 'bg-sky-400 text-white';
      default:
        return null;
    }
  };

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
        dataIndex: 'status',
        key: 'status',

        render: (status) => <Tag className={`${renderStatus(status)} rounded-[42px] border-none px-5 py-[0.5px] text-base`}>{status}</Tag>,
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',

        render: (record) => (
          <Dropdown
            overlay={
              <Menu className="w-26 px-4 p-2.5 bg-white rounded-[5px] shadow flex-col justify-start items-center inline-flex">
                <Menu.Item key="edit" onClick={() => handleEdit(record)}>
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
            placement="bottomCenter"
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

  const showEditModal = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalVisible(true);
  };

  const handleAddOk = (newAdmin) => {
    setAdmins([...admins, newAdmin]);
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

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const handleEditOk = (updatedAdmin) => {
    setAdmins(admins.map((admin) => (admin.id === updatedAdmin.id ? updatedAdmin : admin)));
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

  const handleEdit = (record) => {
    showEditModal(record);
  };

  const showDeleteModal = (record) => {
    setSelectedAdmin(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = (adminId) => {
    setAdmins(admins.filter((admin) => admin.id !== adminId));
    setIsDeleteModalVisible(false);
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
        <div className=" px-6 py-3 rounded-lg shadow mt-6">
          <Tables data={admins} columns={columns} pagination={true} initialPageSize={10} />
        </div>
        <Modal open={isAddModalVisible} onCancel={handleAddCancel} footer={null} width={730}>
          <AddAdminForm onAdd={handleAddOk} onCancel={handleAddCancel} />
        </Modal>
        <Modal open={isEditModalVisible} onCancel={handleEditCancel} footer={null} width={730}>
          <EditAdminForm admin={selectedAdmin} onEdit={handleEditOk} onCancel={handleCancelEdit} />
        </Modal>
        <DeleteModal isVisible={isDeleteModalVisible} onOk={handleDelete} onCancel={handleCancelDelete} record={selectedAdmin} />
      </div>
    </ContentLayout>
  );
};

export default ManageAdmin;
