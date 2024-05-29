import { ActionIcons, AddCircleIcon } from "../../assets/icons";
import { useMemo, useState } from "react";
import GoldBadge from "../../assets/image/GoldBadge.png"
import SilverBadge from "../../assets/image/SilverBadge.png"
import ClassicBadge from "../../assets/image/ClassicBadge.png"
import Tables from "../../components/global/Table";
import { formatNumber } from "../../utils/formatNumbers";
import { Button, Dropdown, Menu } from "antd";
import { toast } from "react-toastify";
import ContentLayout from "../../layouts/ContentLayout";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { AddModal } from "../../components/Achievement/AddModal";
import { EditModal } from "../../components/Achievement/EditModal";
import { DeleteModal } from "../../components/Achievement/DeleteModal";

export default function ManageUserAchivements() {
  const badge = useMemo(
    () => ({
      Gold: (<img src={GoldBadge} alt="Gold Badge" />),
      Silver: (<img src={SilverBadge} alt="Silver Badge" />),
      Classic: (<img src={ClassicBadge} alt="Bronze Badge" />),
    }),
    []
  );

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [dataAchievements, setDataAchievements] = useState([
    {
      id: 1,
      level: "Gold",
      lencana: badge.Gold,
      target: formatNumber(175000),
    },
    {
      id: 2,
      level: "Silver",
      lencana: badge.Silver,
      target: formatNumber(5000),
    },
    {
      id: 3,
      level: "Classic",
      lencana: badge.Classic,
      target: formatNumber(0),
    },
  ]);

  const columnAchievements = useMemo(
    () => [
      { title: "No", dataIndex: "id", key: "id", width: 106 },
      { title: "Level", dataIndex: "level", key: "level" },
      { title: "Lencana", dataIndex: "lencana", key: "lencana" },
      { title: "Target Point", dataIndex: "target", key: "target" },
      {
        title: "Aksi",
        dataIndex: "aksi",
        key: "aksi",
        width: 106,
        render: (text, record) => (
          <Dropdown
            overlay={
              <Menu className="p-4 bg-white rounded shadow flex-col justify-start items-center inline-flex">
                <Menu.Item key="edit" onClick={() => handleEdit(record)}>
                  <button className="text-black hover:text-white bg-white hover:bg-warning-500 btn-m flex items-center gap-2 px-6 py-2 rounded-[5px] w-full">
                    <FaEdit />
                    Edit
                  </button>
                </Menu.Item>
                <Menu.Item key="delete" onClick={() => handleDelete(record)}>
                  <button className="text-black hover:text-white bg-white hover:bg-danger-500 btn-m flex items-center gap-2 px-4 py-2 rounded-[5px] w-full">
                    <FaTrash /> Delete
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

  const dataUserAchievements = useMemo(
    () => [
      {
        id: 1,
        nama: "Harry Styles",
        lencana: badge.Gold,
        totalPoin: formatNumber(500000),
        lokasi: "Jakarta",
      },
      {
        id: 2,
        nama: "Zayn Malik",
        lencana: badge.Gold,
        totalPoin: formatNumber(300000),
        lokasi: "Jakarta",
      },
      {
        id: 3,
        nama: "John Doe",
        lencana: badge.Gold,
        totalPoin: formatNumber(200000),
        lokasi: "Jakarta",
      },
      {
        id: 4,
        nama: "Jane Smith",
        lencana: badge.Silver,
        totalPoin: formatNumber(100000),
        lokasi: "Bandung",
      },
      {
        id: 5,
        nama: "Alice Johnson",
        lencana: badge.Classic,
        totalPoin: formatNumber(50000),
        lokasi: "Surabaya",
      },
    ],
    []
  );

  const columnUserAchievements = useMemo(
    () => [
      { title: "No", dataIndex: "id", key: "id", width: 106 },
      { title: "Nama", dataIndex: "nama", key: "nama" },
      { title: "Lencana", dataIndex: "lencana", key: "lencana" },
      { title: "Total Poin", dataIndex: "totalPoin", key: "totalPoin" },
      { title: "Lokasi", dataIndex: "lokasi", key: "lokasi" },
    ],
    []
  );

  const showModal = () => {
    setIsAddModalVisible(true);
  };

  const handleOk = (newAchievement) => {
    setDataAchievements((prevData) => [...prevData, newAchievement]);
    toast.success("Berhasil Menambahkan Level");
    setIsAddModalVisible(false);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleEdit = (record) => {
    setSelectedLevel(record);
    setIsEditModalVisible(true);
  };

  const handleOkEdit = (updatedRecord) => {
    setDataAchievements((prevData) =>
      prevData.map((item) =>
        item.id === updatedRecord.id ? updatedRecord : item
      )
    );
    toast.success("Berhasil Mengedit Level");
    setIsEditModalVisible(false);
  };

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleOkDelete = (id) => {
    setDataAchievements((prevData) =>
      prevData.filter((item) => item.id !== id)
    );
    toast.success("Berhasil Menghapus Level");
    setIsDeleteModalVisible(false);
  };

  return (
    <ContentLayout title={"Pencapaian"}>
      <section>
        <div className="p-5 bg-[#F9FAFB]">
          <div className="px-8 py-6 shadow-md flex flex-col gap-6 rounded-lg bg-white">
            <div className="flex justify-between items-center">
              <h5 className="h5 font-bold">Daftar Pencapaian</h5>
              <button
                className="btn-l font-bold px-[22px] py-2 bg-primary-500 text-white flex items-center gap-2 rounded-[20px] shadow-t-md"
                onClick={showModal}
              >
                <AddCircleIcon /> Tambah
              </button>
            </div>
            <div>
              <Tables data={dataAchievements} columns={columnAchievements} />
            </div>
          </div>
          <div className="px-8 py-6 mt-5 shadow-md flex flex-col gap-6 rounded-lg bg-white">
            <div className="flex justify-between items-center">
              <h5 className="h5 font-bold">Peringkat Pengguna</h5>
            </div>
            <div>
              <Tables
                data={dataUserAchievements}
                columns={columnUserAchievements}
              />
            </div>
          </div>
        </div>
        <AddModal
          isVisible={isAddModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        />
        <EditModal
          isVisible={isEditModalVisible}
          onOk={handleOkEdit}
          onCancel={() => setIsEditModalVisible(false)}
          record={selectedLevel}
        />
        <DeleteModal
          isVisible={isDeleteModalVisible}
          onOk={handleOkDelete}
          onCancel={() => setIsDeleteModalVisible(false)}
          record={recordToDelete}
        />
      </section>
    </ContentLayout>
  );
}