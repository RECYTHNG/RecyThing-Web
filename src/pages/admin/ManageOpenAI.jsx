import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dropdown, Menu, Tooltip, Modal } from 'antd';
import Tables from '../../components/global/Table';
import ContentLayout from '../../layouts/ContentLayout';
import Edit from '../../assets/edit.svg';
import Delete from '../../assets/trash.svg';
import HorizontalDotsIcon from '../../assets/moreicons';
import Eye from '../../assets/eye2.svg';
import AddDataForm from '../../components/customedata/addform';
import EditDataForm from '../../components/customedata/editform';
import DetailModal from '../../components/customedata/detailmodal';
import { toast } from 'react-toastify';
import { DeleteModal } from '../../components/customedata/modaldelete';
import AddButton from '../../components/global/button/AddButton';
import { useFetch, useUpdateData } from '../../hooks/useFetch';

const ManageOpenAI = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  const { data: customData, isLoading } = useFetch(`/custom-datas?page=${currentPage}&limit=${pageSize}`, 'custom-datas');

  const data = useMemo(
    () =>
      customData?.data?.['custom_datas']?.map((admin) => ({
        id: admin.id,
        topic: admin.topic,
        description: admin.description,
        created_at: new Date(admin.created_at).toLocaleDateString('id-ID'),
        updated_at: admin.updated_at,
      })) || [],
    [customData]
  );
  console.log(customData);

  const columns = useMemo(
    () => [
      { title: 'No', dataIndex: 'id', key: 'id' },
      { title: 'Tanggal', dataIndex: 'created_at', key: 'created_at' },
      { title: 'Topik', dataIndex: 'topic', key: 'topic' },
      {
        title: 'Deskripsi',
        dataIndex: 'description',
        key: 'description',
        render: (text) => (
          <Tooltip title={text}>
            <span>{truncateText(text, 45)}</span>
          </Tooltip>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (record) => (
          <Dropdown
            overlay={
              <Menu className="w-26 px-4 p-2.5 bg-white rounded-[5px] shadow flex-col justify-start items-center inline-flex ">
                <Menu.Item key="edit" onClick={() => handleEdit(record)}>
                  <div className="w-[80px] h-[30px] px-1.5 py-0.5 rounded gap-2.5 inline-flex items-center">
                    <img src={Edit} alt="Edit" className="w-4 h-4" />
                    <div className="text-black text-base font-normal leading-relaxed">Edit</div>
                  </div>
                </Menu.Item>
                <Menu.Item key="detail" onClick={() => handleDetail(record)}>
                  <div className="w-[80px] h-[30px] px-1.5 py-0.5 rounded gap-2.5 inline-flex items-center">
                    <img src={Eye} alt="Detail" className="w-4 h-4" />
                    <div className="text-black text-base font-normal leading-relaxed">Detail</div>
                  </div>
                </Menu.Item>
                <Menu.Item key="delete" onClick={() => confirmDelete(record)}>
                  <div className="w-[80px] h-[30px] px-1.5 py-0.5 rounded gap-2.5 inline-flex items-center">
                    <img src={Delete} alt="Delete" className="w-4 h-4" />
                    <div className="text-black text-base font-normal leading-relaxed">Hapus</div>
                  </div>
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            placement="bottomRight"
          >
            <Button icon={<HorizontalDotsIcon />} />
          </Dropdown>
        ),
      },
    ],
    []
  );

  const handleEdit = (record) => {
    setEditData(record);
    setIsEditModalVisible(true);
  };

  const handleDetail = (record) => {
    setDetailData(record);
    setIsDetailModalVisible(true);
  };

  const confirmDelete = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteOk = () => {
    toast.success('Topik berhasil dihapus.', {
      position: 'top-right',
      autoClose: 2000,
      style: {
        marginTop: '90px',
      },
    });
    setIsDeleteModalVisible(false);
    setRecordToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setRecordToDelete(null);
  };

  const showModal = () => {
    setIsAddModalVisible(true);
  };

  const handleOk = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDetailModalVisible(false);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDetailModalVisible(false);
  };

  const handleEditSubmit = () => {
    setIsEditModalVisible(false);
    toast.success('Data berhasil di ubah!', {
      position: 'top-right',
      autoClose: 2000,
      style: {
        marginTop: '90px',
      },
    });
  };

  const handleAddSubmit = () => {
    setIsAddModalVisible(false);
    toast.success('Data berhasil di tambah!.', {
      position: 'top-right',
      autoClose: 2000,
      style: {
        marginTop: '90px',
      },
    });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <ContentLayout title={'Manajemen OpenAI'}>
      <div className="px-6 py-9 bg-[#F4F4F4]">
        <div className="flex items-end justify-end text-[#414141]">
          <AddButton text="Tambah" onClick={showModal} />
        </div>
        <div className="px-6 py-3 shadow-md flex flex-col gap-6 rounded-lg bg-white mt-6">
          <Tables data={{ items: data, totalCount: customData?.data?.total || 0 }} columns={columns} pagination={true} initialPageSize={10} onPageChange={handlePageChange} isLoading={isLoading} />
        </div>
      </div>
      <Modal open={isAddModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={640}>
        <AddDataForm onCancel={handleCancel} onSubmit={handleAddSubmit} />
      </Modal>
      <Modal open={isEditModalVisible} onCancel={handleCancel} footer={null} width={640}>
        <EditDataForm id={editData?.id} initialTopic={editData?.topic} initialDescription={editData?.description} onSubmit={handleEditSubmit} onCancel={handleCancel} />
      </Modal>
      <DetailModal open={isDetailModalVisible} onCancel={handleCancel} data={detailData} />
      <DeleteModal open={isDeleteModalVisible} onOk={() => handleDeleteOk(recordToDelete?.id)} onCancel={handleDeleteCancel} record={recordToDelete} />
    </ContentLayout>
  );
};

export default ManageOpenAI;
