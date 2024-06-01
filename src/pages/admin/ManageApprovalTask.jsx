import { useMemo, useState } from "react";
import ContentLayout from "../../layouts/ContentLayout";
import { Button, Dropdown, Menu, Tag, Avatar, Modal } from "antd";
import { ActionIcons } from "../../components/Icons/icons";
import Tables from "../../components/global/Table";
import { ApproveModalChildren, DisapproveModalChildren } from "../../components/Mission/Approval/ModalChild";

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
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState([
    {
      id: 'TM01',
      namaMisi: 'Misi Pertama',
      pelaksana: 'John Doe',
      batasAkhir: '2024-06-01',
      status: 'Menunggu',
      profilePic: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 'TM02',
      namaMisi: 'Misi Kedua',
      pelaksana: 'Jane Smith',
      batasAkhir: '2024-06-10',
      status: 'Tolak',
      profilePic: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 'TM03',
      namaMisi: 'Misi Ketiga',
      pelaksana: 'Robert Brown',
      batasAkhir: '2024-06-15',
      status: 'Setuju',
      profilePic: 'https://randomuser.me/api/portraits/men/3.jpg'
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

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", key: "id"  },
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
        )
      },
      { title: "Batas Akhir", dataIndex: "batasAkhir", key: "batasAkhir" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag
            className={`${getStatusColor(status)} rounded-full border-none px-5 py-[2px] text-base`}
          >
            {status}
          </Tag>
        ),
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
                <Menu.Item key="setuju" onClick={() => showSetujuModal(record)}>
                  <div className="w-[59px] h-[30px] bg-white px-1.5 py-0.5 hover:bg-success-500 rounded justify-center items-center gap-2.5 inline-flex">
                    <div className="text-black hover:text-white text-base font-normal leading-relaxed">Setuju</div>
                  </div>
                </Menu.Item>
                <Menu.Item key="tolak" onClick={() => showTolakModal(record)}>
                  <div className="w-[59px] h-[30px] text-black hover:text-white bg-white px-1.5 py-0.5 hover:bg-rose-600 rounded justify-center items-center gap-2.5 inline-flex ">
                    <div className="text-black hover:text-white text-base font-normal leading-relaxed">Tolak</div>
                  </div>
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            placement="bottomRight"
          >
            <Button icon={<ActionIcons />} />
          </Dropdown>
        ),
      },
    ],
    [data]
  );

  return (
    <ContentLayout title={"Persetujuan Manajemen Misi"}>
      <div className="px-4 py-4 bg-[#F9FAFB]">
        <div className="p-6 bg-white rounded-[10px] shadow-lg">
          <Tables data={data} columns={columns} pagination={true}/>
        </div>
      </div>
      <Modal
        open={isSetujuModalVisible}
        footer={null}
        onCancel={() => setIsSetujuModalVisible(false)}
      >
        <ApproveModalChildren onOk={handleSetuju} onCancel={() => setIsSetujuModalVisible(false)}/>
      </Modal>
      <Modal
        open={isTolakModalVisible}
        footer={null}
        onCancel={() => setIsTolakModalVisible(false)}
      >
        <DisapproveModalChildren onOk={handleTolak} onCancel={() => setIsTolakModalVisible(false)}/>
      </Modal>
    </ContentLayout>
  );
}