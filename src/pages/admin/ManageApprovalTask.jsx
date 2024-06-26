import { useMemo, useState } from "react";
import ContentLayout from "../../layouts/ContentLayout";
import { Dropdown, Tag, Avatar, Modal, Button } from "antd";
import Tables from "../../components/global/Table";
import { ApproveModalChildren, DisapproveModalChildren, DetailModal } from "../../components/Mission/Approval/ModalChild";
import HorizontalDotsIcon from "../../assets/moreicons";
import { useFetch, useUpdateData } from "../../hooks/useFetch";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const getStatusColor = (status) => {
  switch (status) {
    case "Menunggu":
      return "bg-warning-500 text-white";
    case "Tidak Setuju":
      return "bg-danger-500 text-white";
    case "Setuju":
      return "bg-success-500 text-white";
    default:
      return "";
  }
};

const mapStatus = (status) => {
  switch (status) {
    case 'accept':
      return 'Setuju';
    case 'reject':
      return 'Tidak Setuju';
    default:
      return "Menunggu";
  }
};

export default function ManageApprovalTask() {
  const [isSetujuModalVisible, setIsSetujuModalVisible] = useState(false);
  const [isTolakModalVisible, setIsTolakModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const { data: approvalData, isLoading, isError } = useFetch(`/approval-tasks?page=${currentPage}&limit=${pageSize}&sort_by=id&sort_type=desc`, 'approvalTasks');
  const updateData = useUpdateData();

  const data = useMemo(
    () =>
      approvalData?.data?.data?.map((item) => ({
        id: item.id,
        namaMisi: item.task.title,
        pelaksana: item.user.name,
        profilePic: item.user.profile,
        batasAkhir: dayjs(item.task.end_date).format("DD/MM/YYYY"),
        status: mapStatus(item.status_accept),
        })) || [],
      [approvalData]
    );

  const showSetujuModal = (record) => {
    setSelectedRecord(record);
    setIsSetujuModalVisible(true);
  };

  const showTolakModal = (record) => {
    setSelectedRecord(record);
    setIsTolakModalVisible(true);
  };

  const handleSetuju = async () => {
    try {
      await updateData.mutateAsync({
        endpoint: `/approve-tasks/${selectedRecord.id}`,
        updatedData: {},
      });
      toast.success('Berhasil Menyetujui Tugas!');
    } catch (error) {
      toast.error('Gagal Menyetujui Tugas');
    } finally {
      setIsSetujuModalVisible(false);
    }
  };

  const handleTolak = async (reason) => {
    try {
      await updateData.mutateAsync({
        endpoint: `/reject-tasks/${selectedRecord.id}`,
        updatedData: { reason },
      });
      toast.error("Berhasil Menolak Tugas!")
    } catch (error) {
      toast.error("Gagal Menolak Tugas!")
    } finally {
      setIsTolakModalVisible(false);
    }
  };

  const showDetailModal = (record) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };

  const handleMenuClick = (e) => {
    console.log('click', e.key);
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
  };

  const handleMenuItemClick = (action, record) => {
    if (action === 'approve') {
      showSetujuModal(record);
    } else if (action === 'disapprove') {
      showTolakModal(record);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
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
          const menuItems = [
            {
              label: <span type="text">Setuju</span>,
              key: 'Setuju',
              className: "custom-menu-item-approve !px-5",
              onClick: (e) => {
                e.domEvent.stopPropagation();
                handleMenuItemClick('approve', record);
              },
            },
            {
              label: <span type="text">Tolak</span>,
              key: 'Tidak Setuju',
              className: "custom-menu-item-delete !px-5",
              onClick: (e) => {
                e.domEvent.stopPropagation();
                handleMenuItemClick('disapprove', record);
              },
            },
          ];

          const menuProps = {
            items: menuItems,
            onClick: handleMenuClick,
          };

          return (
            <Dropdown
              menu={menuProps}
              trigger={['click']}
              overlayClassName='btn-m text-center'
              disabled={record.status !== "Menunggu"}
            >
              <div className='cursor-pointer' onClick={handleIconClick}>
                <Button icon={<HorizontalDotsIcon />} />
              </div>
            </Dropdown>
          );
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
            data={{ items: data, totalCount: approvalData?.data.total_data || 0 }}
            columns={columns}
            onPageChange={handlePageChange}
            pagination={true}
            initialPageSize={15}
            enableRowClick
            onRowClick={showDetailModal}
            isLoading={isLoading}
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
          setIsDetailModalVisible={setIsDetailModalVisible}
        />
      </Modal>
    </ContentLayout>
  );
}