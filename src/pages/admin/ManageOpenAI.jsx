import React, { useMemo, useState } from 'react';
import { Button, Dropdown, Menu, Tooltip, Modal, message } from 'antd';
import Tables from '../../components/global/Table';
import ContentLayout from '../../layouts/ContentLayout';
import { AddCircleIcon } from '../../assets/icons';
import Edit from '../../assets/edit.svg';
import Delete from '../../assets/trash.svg';
import HorizontalDotsIcon from '../../assets/moreicons';
import Eye from '../../assets/eye2.svg';
import AddDataForm from '../../components/customedata/addform';
import EditDataForm from '../../components/customedata/editform';
import DetailModal from '../../components/customedata/detailmodal';
import { toast } from 'react-toastify';

const ManageOpenAI = () => {
  const [admins, setAdmins] = useState([
    { id: 1, tanggal: '10/04/2024', topik: 'Daur Ulang Kertas', deskripsi: 'Proses mengumpulkan, mencacah, dan mengolah kertas bekas menjadi produk baru seperti kertas atau karton.' },
    { id: 2, tanggal: '12/01/2024', topik: 'Daur Ulang Kaca', deskripsi: 'Tahapan pengumpulan, pembersihan, penghancuran, dan peleburan kaca bekas menjadi produk baru.' },
    { id: 3, tanggal: '15/01/2024', topik: 'Pengelolaan Limbah Elektronik', deskripsi: 'Proses pengumpulan, pemisahan, dan pengolahan perangkat elektronik bekas untuk diambil komponennya atau didaur ulang.' },
    { id: 4, tanggal: '20/01/2024', topik: 'Kompos', deskripsi: 'Hasil penguraian bahan organik menjadi pupuk alami melalui proses pengumpulan dan penguraian sisa makanan serta daun.' },
    { id: 5, tanggal: '20/01/2024', topik: 'Pengurangan Limbah', deskripsi: 'Berapa banyak pengguna kami yang sedang aktif?' },
    { id: 6, tanggal: '20/01/2024', topik: 'Pengelolaan Sampah Organik', deskripsi: 'Bagaimana tingkat kepuasan pengguna terhadap layanan pelanggan?' },
    { id: 7, tanggal: '20/01/2024', topik: 'Daur Ulang Baterai', deskripsi: 'Pengumpulan baterai di pusat daur ulang khusus untuk memisahkan komponen berbahaya dan menggunakan kembali materialnya.' },
    { id: 8, tanggal: '20/01/2024', topik: 'Daur Ulang Minyak Bekas', deskripsi: 'Proses pengumpulan dan pengolahan minyak bekas menjadi biodiesel atau produk lain seperti sabun.' },
    { id: 9, tanggal: '20/01/2024', topik: 'Daur Ulang Botol Plastik', deskripsi: 'Proses pengumpulan, pembersihan, pencacahan menjadi serpihan, dan peleburan botol plastik bekas untuk membuat produk plastik baru.' },
    { id: 10, tanggal: '20/01/2024', topik: 'Daur Ulang Karet', deskripsi: 'Proses pencacahan, peleburan, dan pembentukan karet bekas menjadi produk baru seperti alas lantai atau tikar.' },
    { id: 11, tanggal: '20/01/2024', topik: 'Daur Ulang Karet', deskripsi: 'Proses pencacahan, peleburan, dan pembentukan karet bekas menjadi produk baru seperti alas lantai atau tikar.' },
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [detailData, setDetailData] = useState(null);

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  const columns = useMemo(
    () => [
      { title: 'No', dataIndex: 'id', key: 'id' },
      { title: 'Tanggal', dataIndex: 'tanggal', key: 'tanggal' },
      { title: 'Topik', dataIndex: 'topik', key: 'topik' },
      {
        title: 'Deskripsi',
        dataIndex: 'deskripsi',
        key: 'deskripsi',
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
    Modal.confirm({
      title: 'Konfirmasi Penghapusan',
      content: `Apakah Anda yakin ingin menghapus topik "${record.topik}"?`,
      okText: 'Hapus',
      okType: 'danger',
      cancelText: 'Batal',
      onOk: () => handleDelete(record),
    });
  };

  const handleDelete = (record) => {
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== record.id));
    message.success('Topik berhasil dihapus.');
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

  const handleEditSubmit = (updatedData) => {
    setAdmins((prevAdmins) => prevAdmins.map((admin) => (admin.id === updatedData.id ? { ...admin, ...updatedData } : admin)));
    setIsEditModalVisible(false);
    toast.success('Data berhasil di ubah!', {
      position: 'top-right',
      autoClose: 2000,
      style: {
        marginTop: '90px',
      },
    });
  };

  const handleAddSubmit = (newData) => {
    const newId = admins.length ? Math.max(admins.map((admin) => admin.id)) + 1 : 1;
    const newAdmin = { id: newId, ...newData };
    setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
    setIsAddModalVisible(false);
    toast.success('Data berhasil di tambah!.', {
      position: 'top-right',
      autoClose: 2000,
      style: {
        marginTop: '90px',
      },
    });
  };

  return (
    <ContentLayout title={'Manajemen OpenAI'}>
      <div className="px-6 py-9 bg-[#F4F4F4]">
        <div className="flex items-end justify-end text-[#414141]">
          <div className="btn-l font-bold px-[22px] py-2 bg-primary-500 text-white flex items-center gap-2 rounded-[20px] shadow-t-md mb-7 cursor-pointer" onClick={showModal}>
            <AddCircleIcon /> Tambah
          </div>
        </div>
        <div className="px-6 py-3 shadow-md flex flex-col gap-6 rounded-lg bg-white">
          <Tables data={admins} columns={columns} />
        </div>
      </div>
      <Modal open={isAddModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={640}>
        <AddDataForm onCancel={handleCancel} onSubmit={handleAddSubmit} />
      </Modal>
      <Modal open={isEditModalVisible} onCancel={handleCancel} footer={null} width={640}>
        <EditDataForm id={editData?.id} initialTopic={editData?.topik} initialDescription={editData?.deskripsi} onSubmit={handleEditSubmit} onCancel={handleCancel} />
      </Modal>
      <DetailModal visible={isDetailModalVisible} onCancel={handleCancel} data={detailData} />
    </ContentLayout>
  );
};

export default ManageOpenAI;
