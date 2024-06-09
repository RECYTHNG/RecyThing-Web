import { ActionIcons } from "../../components/global/Icons/icons";
import { useMemo, useState } from "react";
import Tables from "../../components/global/Table";
import { Button, Dropdown, Menu } from "antd";
import { toast } from "react-toastify";
import ContentLayout from "../../layouts/ContentLayout";
import { FaEye } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { DeleteModal, ViewModal } from "../../components/User/ModalUsers";
import UserImage from "../../assets/image/user-jack.png";

export default function ManageUserDetail() {
  const [userPoin, setUserPoin] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [dataUsers, setDataUsers] = useState([
    {
      id: 1,
      nama: "Jack Smith",
      email: "jack@gmail.com",
      target: 1000,
    },
    {
      id: 2,
      nama: "Emily White",
      email: "emily@gmail.com",
      target: 1500,
    },
    {
      id: 3,
      nama: "Noah Wili",
      email: "noah@gmail.com",
      target: 2000,
    },
    {
      id: 4,
      nama: "Amelia",
      email: "amelia@gmail.com",
      target: 900,
    },
    {
      id: 5,
      nama: "Evelyn",
      email: "evelyn@gmail.com",
      target: 1200,
    },
    {
      id: 6,
      nama: "Ava Lee",
      email: "avalee@gmail.com",
      target: 850,
    },
    {
      id: 7,
      nama: "Ethan Taylo",
      email: "ethan@gmail.com",
      target: 700,
    },
    {
      id: 8,
      nama: "olivia Harris",
      email: "olivia@gmail.com",
      target: 950,
    },
    {
      id: 9,
      nama: "Lucas Thom",
      email: "lucas@gmail.com",
      target: 1100,
    },
    {
      id: 10,
      nama: "Mason",
      email: "mason@gmail.com",
      target: 1900,
    },
  ]);

  const columnUser = useMemo(
    () => [
      { title: "No", dataIndex: "id", key: "id", width: 106 },
      {
        title: "Nama",
        dataIndex: "nama",
        key: "nama",
        render: (text) => (
          <div className="flex items-center">
            <img src={UserImage} alt="User" className="w-8 h-8 rounded-full mr-2" />
            {text}
          </div>
        ),
      },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Poin", dataIndex: "target", key: "target" },
      {
        title: "Aksi",
        dataIndex: "aksi",
        key: "aksi",
        width: 106,
        render: (text, record) => (
          <Dropdown
            overlay={
              <Menu className="p-4 bg-white rounded shadow flex-col justify-start items-center">
                <Menu.Item key="view" onClick={() => handleView(record)}>
                  <button className="text-black hover:text-white bg-white hover:bg-info-500 btn-m flex items-center gap-2 px-4 py-2 rounded-[5px] w-full">
                    <FaEye />
                    Detail
                  </button>
                </Menu.Item>
                <Menu.Item key="delete" onClick={() => handleDelete(record)}>
                  <button className="text-black hover:text-white bg-white hover:bg-danger-500 btn-m flex items-center gap-2 px-4 py-2 rounded-[5px] w-full">
                    <FaTrash />
                    Hapus
                  </button>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button icon={<ActionIcons />} />
          </Dropdown>
        ),
      },
    ],
    []
  );

  const handleView = (record) => {
    setIsViewModalVisible(true);
  };

  const handleOkView = (updatedRecord) => {
    const user = dataUsers.find((user) => user.id === updatedRecord.id);
    const poinValue = user.target;
    setUserPoin(poinValue); // Set nilai poin
    setIsViewModalVisible(false);
  };

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleOkDelete = (id) => {
    setDataUsers((prevData) => prevData.filter((item) => item.id !== id));
    toast.success("Data berhasil dihapus!");
    setIsDeleteModalVisible(false);
  };

  return (
    <ContentLayout title={"Manajemen Pengguna"}>
      <section>
        <div className="p-5 bg-[#F9FAFB]">
          <div className="flex flex-col gap-8">
            <div className="px-8 py-4 shadow-md rounded-lg bg-white">
              <Tables pagination={true} initialPageSize={10} data={dataUsers} columns={columnUser} />
            </div>
          </div>
        </div>
        <ViewModal isVisible={isViewModalVisible} onOk={handleOkView} onCancel={() => setIsViewModalVisible(false)} initialPoin={userPoin} userData={recordToDelete ? dataUsers.find((user) => user.id === recordToDelete.id) : null} />
        <DeleteModal isVisible={isDeleteModalVisible} onOk={handleOkDelete} onCancel={() => setIsDeleteModalVisible(false)} record={recordToDelete} />
      </section>
    </ContentLayout>
  );
}
