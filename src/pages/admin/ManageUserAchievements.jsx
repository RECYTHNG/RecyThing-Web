import { useEffect, useMemo, useState } from "react";
import { Button, Dropdown } from "antd";
import { EditOutlined } from '@ant-design/icons';
import Tables from "../../components/global/Table";
import { formatNumber } from "../../utils/formatNumbers";
import ContentLayout from "../../layouts/ContentLayout";
import HorizontalDotsIcon from "../../assets/moreicons";
import { useFetch } from "../../hooks/useFetch";
import { EditModal } from "../../components/Achievement/ModalAchievements";

export default function ManageUserAchievements() {
  const { data: achievementsData, error, isLoading } = useFetch('/achievements', 'achievements');
  const { data: userAchievementsData, isLoading: isLoadingUserAchievements } = useFetch('/leaderboard', 'userAchievements');

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [dataAchievements, setDataAchievements] = useState([]);
  const [dataUserAchievements, setDataUserAchievements] = useState([]);

  useEffect(() => {
    if (achievementsData && achievementsData.data) {
      setDataAchievements(achievementsData.data.map((item, index) => ({
        id: item.id,
        no: index + 1,
        level: item.level.charAt(0).toUpperCase() + item.level.slice(1),
        lencana: <img src={item.badge_url} alt={`${item.level} Badge`} className="w-20" />,
        target_point: item.target_point,
        formatedTargetPoint: formatNumber(item.target_point) 
      })));
    }
  }, [achievementsData]);

  useEffect(() => {
    if (userAchievementsData && userAchievementsData.data) {
      setDataUserAchievements(userAchievementsData.data.map((item, index) => ({
        id: index + 1,
        nama: 
          <div className="flex gap-2 items-center">
            <img src={item.picture_url} alt={`${item.name} Picture`} className="w-10 rounded-full"/>
            {item.name}
          </div>,
        lencana: <img src={item.badge} alt={`${item.name} Badge`} className="w-10" />,
        totalPoin: formatNumber(item.point),
        lokasi: item.address
      })));
    }
  }, [userAchievementsData]);

  const columnAchievements = useMemo(() => [
    { title: "No", dataIndex: "no", key: "no", width: 106 },
    { title: "Level", dataIndex: "level", key: "level" },
    { title: "Lencana", dataIndex: "lencana", key: "lencana" },
    { title: "Target Point", dataIndex: "formatedTargetPoint", key: "formatedTargetPoint" },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      width: 106,
      render: (_, record) => {
        const menuItems = [
          {
            label: <span type="text" className="text-base ml-1">Edit</span>,
            icon: <EditOutlined className="!text-base"/>,
            key: 'approve',
            className: "custom-menu-item-edit !px-5",
            onClick: () => handleEdit(record),
          },
        ];

        const menuProps = {
          items: menuItems,
        };

        return (
          <Dropdown menu={menuProps} trigger={['click']} overlayClassName='text-lg'>
            <div className='cursor-pointer'>
              <Button icon={<HorizontalDotsIcon />} />
            </div>
          </Dropdown>
        );
      }
    },
  ], []);

  const columnUserAchievements = useMemo(() => [
    { title: "No", dataIndex: "id", key: "id", width: 106 },
    { title: "Nama", dataIndex: "nama", key: "nama" },
    { title: "Lencana", dataIndex: "lencana", key: "lencana" },
    { title: "Total Poin", dataIndex: "totalPoin", key: "totalPoin" },
    { title: "Lokasi", dataIndex: "lokasi", key: "lokasi" },
  ], []);

  const handleEdit = (record) => {
    setSelectedLevel(record);
    setIsEditModalVisible(true);
  };

  const handleOkEdit = (updatedRecord) => {
    setDataAchievements((prevData) => {
      return prevData.map((item) => item.id === updatedRecord.id ? updatedRecord : item);
    });
    setIsEditModalVisible(false);
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
              <Tables data={dataUserAchievements} columns={columnUserAchievements} isLoading={isLoadingUserAchievements} />
            </div>
          </div>
        </div>
        <EditModal isVisible={isEditModalVisible} onOk={handleOkEdit} onCancel={() => setIsEditModalVisible(false)} record={selectedLevel} />
      </section>
    </ContentLayout>
  );
}