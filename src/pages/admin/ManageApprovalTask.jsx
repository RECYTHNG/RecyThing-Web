import { useMemo, useState } from "react";
import ContentLayout from "../../layouts/ContentLayout";
import { Dropdown, Tag, Avatar, Modal, Button } from "antd";
import Tables from "../../components/global/Table";
import { ApproveModalChildren, DetailModal, DisapproveModalChildren } from "../../components/Mission/Approval/ModalChild";
import HorizontalDotsIcon from "../../assets/moreicons";

const getStatusColor = (status) => {
  switch (status) {
    case "Menunggu":
      return "bg-warning-500 text-white";
    case "Tolak":
      return "bg-danger-500 text-white";
    case "Setuju":
      return "bg-success-500 text-white";
    default:
      return "";
  }
};

export default function ManageApprovalTask() {
  const [isSetujuModalVisible, setIsSetujuModalVisible] = useState(false);
  const [isTolakModalVisible, setIsTolakModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const photosPerPage = 3;

  const [data, setData] = useState([
    {
      id: "TM01",
      namaMisi: "Daur Ulang Plastik",
      pelaksana: "John Doe",
      batasAkhir: "2024-06-01",
      status: "Menunggu",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      waktuUpload: "2024-06-01",
      keterangan:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      photos: [
        "https://via.placeholder.com/500/92c952",
        "https://via.placeholder.com/150/771796",
        "https://via.placeholder.com/150/24f355",
        "https://via.placeholder.com/150/d32776",
        "https://via.placeholder.com/500/f66b97",
        "https://via.placeholder.com/150/56a8c2",
        "https://via.placeholder.com/150/b0f7cc",
        "https://via.placeholder.com/150/54176f",
        "https://via.placeholder.com/150/51aa97",
      ],
    },
    {
      id: "TM02",
      namaMisi: "Penghijauan Kota",
      pelaksana: "Jane Doe",
      batasAkhir: "2024-06-05",
      status: "Setuju",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
      waktuUpload: "2024-05-30",
      keterangan:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      photos: [
        "https://via.placeholder.com/500/92c952",
        "https://via.placeholder.com/150/771796",
        "https://via.placeholder.com/150/24f355",
        "https://via.placeholder.com/150/d32776",
        "https://via.placeholder.com/500/f66b97",
        "https://via.placeholder.com/150/56a8c2",
        "https://via.placeholder.com/150/b0f7cc",
        "https://via.placeholder.com/150/54176f",
        "https://via.placeholder.com/150/51aa97",
      ],
    },
  ]);

  const showSetujuModal = (record) => {
    setSelectedRecord(record);
    setIsSetujuModalVisible(true);
  };

  const showTolakModal = (record) => {
    setSelectedRecord(record);
    setIsTolakModalVisible(true);
  };

  const handleSetuju = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedRecord.id ? { ...item, status: "Setuju" } : item
      )
    );
    setIsSetujuModalVisible(false);
  };

  const handleTolak = (reason) => {
    console.log("Reason for rejection:", reason);
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedRecord.id ? { ...item, status: "Tolak" } : item
      )
    );
    setIsTolakModalVisible(false);
  };

  const showDetailModal = (record) => {
    setSelectedRecord(record);
    setCurrentPhotoIndex(0);
    setCurrentPage(1);
    setIsDetailModalVisible(true);
  };

  const nextPhotos = () => {
    setCurrentPhotoIndex((prevIndex) => prevIndex + photosPerPage);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPhotos = () => {
    setCurrentPhotoIndex((prevIndex) => prevIndex - photosPerPage);
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleMenuClick = (e) => {
    console.log('click', e.key);
  };

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Nama Misi", dataIndex: "namaMisi", key: "namaMisi" },
      {
        title: "Pelaksana",
        dataIndex: "pelaksana",
        key: "pelaksana",
        render: (text, record) => (
          <div className="flex items-center">
            <Avatar src={record.profilePic} className="mr-2" />
            <span>{text}</span>
          </div>
        ),
      },
      { title: "Batas Akhir", dataIndex: "batasAkhir", key: "batasAkhir" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag
            className={`${getStatusColor(
              status
            )} rounded-full border-none px-5 py-[2px] text-base`}
          >
            {status}
          </Tag>
        ),
      },
      {
        title: "Action",
        key: "action",
        align: 'center',
        render: (_, record) => {
          if (record.status === "Menunggu") {
            const menuItems = [
              {
                label: <span type="text">Setuju</span>,
                key: 'approve',
                onClick: () => showSetujuModal(record),
              },
              {
                label: <span type="text">Tolak</span>,
                key: 'disapprove',
                onClick: () => showTolakModal(record)
              },
            ];

            const menuProps = {
              items: menuItems,
              onClick: handleMenuClick,
            };

            return (
              <Dropdown menu={menuProps} trigger={['click']} overlayClassName='btn-m text-center'>
                <div className='cursor-pointer'>
                  <Button icon={<HorizontalDotsIcon />} />
                </div>
              </Dropdown>
            );
          } else {
            return null;
          }
        }
      },
    ],
    [data]
  );

  return (
    <ContentLayout title={"Persetujuan Manajemen Misi"}>
      <div className="px-4 py-4 bg-[#F9FAFB]">
        <div className="p-6 bg-white rounded-[10px] shadow-lg">
          <Tables
            data={data}
            columns={columns}
            pagination={true}
            enableRowClick
            onRowClick={showDetailModal}
          />
        </div>
      </div>
      <Modal
        open={isSetujuModalVisible}
        footer={null}
        onCancel={() => setIsSetujuModalVisible(false)}
      >
        <ApproveModalChildren
          onOk={handleSetuju}
          onCancel={() => setIsSetujuModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isTolakModalVisible}
        footer={null}
        onCancel={() => setIsTolakModalVisible(false)}
      >
        <DisapproveModalChildren
          onOk={handleTolak}
          onCancel={() => setIsTolakModalVisible(false)}
        />
      </Modal>
      <Modal
        open={isDetailModalVisible}
        footer={null}
        onCancel={() => setIsDetailModalVisible(false)}
        width={700}
      >
        <DetailModal
          selectedRecord={selectedRecord}
          currentPhotoIndex={currentPhotoIndex}
          photosPerPage={photosPerPage}
          currentPage={currentPage}
          prevPhotos={prevPhotos}
          nextPhotos={nextPhotos}
          setIsDetailModalVisible={setIsDetailModalVisible}
        />
      </Modal>
    </ContentLayout>
  );
}