import React, { useMemo, useState } from 'react';
import { Modal, Tag, Dropdown, Menu, Button, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import Tables from '../../components/global/Table';
import AddAdminForm from '../../components/admin/addform'; // Sesuaikan path import sesuai kebutuhan
import EditAdminForm from '../../components/admin/editform'; // Sesuaikan path import sesuai kebutuhan
import ContentLayout from '../../layouts/ContentLayout';
import { toast } from 'react-toastify';

const ManageAdmin = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [admins, setAdmins] = useState([
    { id: 'AD001', name: 'Dono Torreto', email: 'donotorreto77@gmail.com', status: 'Super Admin' },
    { id: 'AD002', name: 'Rama Riskynama', email: 'riskyramanama@gmail.com', status: 'Admin' },
    { id: 'AD003', name: 'Darmo Asgarita', email: 'darmociimoetsclalu@gmail.com', status: 'Admin' },
    { id: 'AD004', name: 'Joko Anwar', email: 'jokoanwar@gmail.com', status: 'Admin' },
    { id: 'AD005', name: 'Tara Basro', email: 'tarabasro@gmail.com', status: 'Admin' },
    { id: 'AD006', name: 'Reza Rahadian', email: 'rezarahadian@gmail.com', status: 'Super Admin' },
    { id: 'AD007', name: 'Chelsea Islan', email: 'chelseaislan@gmail.com', status: 'Admin' },
    { id: 'AD008', name: 'Nicholas Saputra', email: 'nicholassaputra@gmail.com', status: 'Admin' },
    { id: 'AD009', name: 'Dian Sastro', email: 'diansastro@gmail.com', status: 'Admin' },
    { id: 'AD010', name: 'Joe Taslim', email: 'joetaslim@gmail.com', status: 'Super Admin' },
    { id: 'AD011', name: 'Iko Uwais', email: 'ikouwais@gmail.com', status: 'Admin' },
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
      { title: 'Admin ID', dataIndex: 'id', key: 'id', width: 117 },
      { title: 'Name', dataIndex: 'name', key: 'name', width: 254 },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 435,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 185,
        render: (status) => <Tag className={`${renderStatus(status)} rounded-[42px] border-none px-5 py-[0.5px] text-base`}>{status}</Tag>,
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 146,
        render: (record) => (
          <Dropdown
            overlay={
              <Menu className="w-[79px] p-2.5 bg-white rounded shadow flex-col justify-start items-center inline-flex">
                <Menu.Item key="edit" onClick={() => handleEdit(record)}>
                  <div className="w-[59px] h-[30px] px-1.5 py-0.5 bg-sky-900 rounded justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-base font-normal leading-relaxed">Edit</div>
                  </div>
                </Menu.Item>
                <Menu.Item key="delete" onClick={() => handleDelete(record)}>
                  <div className="w-[59px] h-[30px] px-1.5 py-0.5 bg-rose-600 rounded justify-center items-center gap-2.5 inline-flex ">
                    <div className="text-white text-base font-normal leading-relaxed">Delete</div>
                  </div>
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            placement="bottomCenter"
          >
            <Button icon={<MoreOutlined />} />
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
    message.success('Admin added successfully');
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleEditOk = (updatedAdmin) => {
    setAdmins(admins.map((admin) => (admin.id === updatedAdmin.id ? updatedAdmin : admin)));
    setIsEditModalVisible(false);
    setSelectedAdmin(null);
    message.success('Admin updated successfully');
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedAdmin(null);
  };

  const handleEdit = (record) => {
    showEditModal(record);
  };

  const handleDelete = (record) => {
    setAdmins(admins.filter((admin) => admin.id !== record.id));
    toast.error('Data has been deleted');
  };

  return (
    <ContentLayout title={'Manage Admin'}>
      <div className="px-6 py-9">
        <div className="flex items-end justify-end text-[#414141]">
          <button onClick={showAddModal}>
            <div className="px-1.5 py-2 bg-sky-900 rounded gap-2.5 flex text-white">Tambah Data Admin</div>
          </button>
        </div>
        <Tables data={admins} columns={columns} />
        <Modal open={isAddModalVisible} onCancel={handleAddCancel} footer={null} width={730}>
          <AddAdminForm onAdd={handleAddOk} />
        </Modal>
        <Modal open={isEditModalVisible} onCancel={handleEditCancel} footer={null} width={730}>
          <EditAdminForm admin={selectedAdmin} onEdit={handleEditOk} />
        </Modal>
      </div>
    </ContentLayout>
  );
};

export default ManageAdmin;
