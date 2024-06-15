import { useEffect, useMemo, useState } from "react";
import { Button, Dropdown } from "antd";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import GoldBadge from "/assets/images/GoldBadge.png";
import SilverBadge from "/assets/images/SilverBadge.png";
import ClassicBadge from "/assets/images/ClassicBadge.png";
import Tables from "../../components/global/Table";
import { formatNumber } from "../../utils/formatNumbers";
import ContentLayout from "../../layouts/ContentLayout";
import HorizontalDotsIcon from "../../assets/moreicons";
import { useFetch } from "../../hooks/useFetch";
import { AddModal, DeleteModal, EditModal } from "../../components/Achievement/ModalAchievements";

export default function ManageUserAchievements() {
  const { data, error, isLoading } = useFetch('/achievements', 'achievements');
  const badge = useMemo(() => ({
    Gold: <img src={GoldBadge} alt="Gold Badge" />,
    Silver: <img src={SilverBadge} alt="Silver Badge" />,
    Classic: <img src={ClassicBadge} alt="Bronze Badge" />,
  }), []);

  console.log(data)

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [dataAchievements, setDataAchievements] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setDataAchievements(data.data.map((item, index) => ({
        id: item.id,
        no: index + 1,
        level: item.level.charAt(0).toUpperCase() + item.level.slice(1),
        lencana: <img src={item.badge_url} alt={`${item.level} Badge`} className="w-20" />,
        target_point: item.target_point,
      })));
    }
  }, [data]);

  const columnAchievements = useMemo(() => [
    { title: "No", dataIndex: "no", key: "no", width: 106 },
    { title: "Level", dataIndex: "level", key: "level" },
    { title: "Lencana", dataIndex: "lencana", key: "lencana" },
    { title: "Target Point", dataIndex: "target_point", key: "target_point" },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      width: 106,
      render: (_, record) => {
        const menuItems = [
          {
            label: <span type="text">Edit</span>,
            icon: <EditOutlined />,
            key: 'approve',
            onClick: () => handleEdit(record),
          },
          {
            label: <span type="text">Delete</span>,
            icon: <DeleteOutlined />,
            key: 'disapprove',
            onClick: () => handleDelete(record),
          },
        ];

        const menuProps = {
          items: menuItems,
        };

        return (
          <Dropdown menu={menuProps} trigger={['click']} overlayClassName='btn-m text-center'>
            <div className='cursor-pointer'>
              <Button icon={<HorizontalDotsIcon />} />
            </div>
          </Dropdown>
        );
      }
    },
  ], []);

  const dataUserAchievements = useMemo(() => [
    { id: 1, nama: "Harry Styles", lencana: badge.Gold, totalPoin: formatNumber(500000), lokasi: "Jakarta" },
    { id: 2, nama: "Zayn Malik", lencana: badge.Gold, totalPoin: formatNumber(300000), lokasi: "Jakarta" },
    { id: 3, nama: "John Doe", lencana: badge.Gold, totalPoin: formatNumber(200000), lokasi: "Jakarta" },
    { id: 4, nama: "Jane Smith", lencana: badge.Silver, totalPoin: formatNumber(100000), lokasi: "Bandung" },
    { id: 5, nama: "Alice Johnson", lencana: badge.Classic, totalPoin: formatNumber(50000), lokasi: "Surabaya" },
  ], [badge]);

  const columnUserAchievements = useMemo(() => [
    { title: "No", dataIndex: "id", key: "id", width: 106 },
    { title: "Nama", dataIndex: "nama", key: "nama" },
    { title: "Lencana", dataIndex: "lencana", key: "lencana" },
    { title: "Total Poin", dataIndex: "totalPoin", key: "totalPoin" },
    { title: "Lokasi", dataIndex: "lokasi", key: "lokasi" },
  ], []);

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
    console.log("Updated Record:", updatedRecord);
    setDataAchievements((prevData) => {
      console.log("Previous Data:", prevData);
      return prevData.map((item) => item.id === updatedRecord.id ? updatedRecord : item);
    });
    toast.success("Berhasil Mengedit Level");
    setIsEditModalVisible(false);
  };
  

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleOkDelete = (id) => {
    setDataAchievements((prevData) => prevData.filter((item) => item.id !== id));
    toast.success("Berhasil Menghapus Level");
    setIsDeleteModalVisible(false);
  };

  return (
    <ContentLayout title={"Pencapaian"}>
      <section>
        <div className="p-5 bg-[#F9FAFB]">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h5 className="h5 font-bold">Daftar Pencapaian</h5>
              {/* <AddButton text="Tambah" onClick={showModal} /> */}
            </div>
            <div className="px-8 py-4 shadow-md rounded-lg bg-white">
              <Tables data={dataAchievements} columns={columnAchievements} isLoading={isLoading} />
            </div>
            <h5 className="h5 font-bold">Peringkat Pengguna</h5>
            <div className="px-8 py-4 shadow-md rounded-lg bg-white">
              <Tables data={dataUserAchievements} columns={columnUserAchievements} isLoading={isLoading} />
            </div>
          </div>
        </div>
        <AddModal isVisible={isAddModalVisible} onOk={handleOk} onCancel={handleCancel} />
        <EditModal isVisible={isEditModalVisible} onOk={handleOkEdit} onCancel={() => setIsEditModalVisible(false)} record={selectedLevel} />
        <DeleteModal isVisible={isDeleteModalVisible} onOk={handleOkDelete} onCancel={() => setIsDeleteModalVisible(false)} record={recordToDelete} />
      </section>
    </ContentLayout>
  );
}