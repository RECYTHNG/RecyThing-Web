import { ActionIcons } from "../../components/global/Icons/icons";
import { useMemo, useState } from "react";
import Tables from "../../components/global/Table";
import { Button, Dropdown, Menu } from "antd";
import { toast } from "react-toastify";
import ContentLayout from "../../layouts/ContentLayout";
import { FaEye, FaTrash } from "react-icons/fa6";
import { DeleteModal, ViewModal } from "../../components/User/ModalUsers";
import { useFetch, useDeleteData } from "../../hooks/useFetch";
import dayjs from "dayjs";

export default function ManageUserDetail() {
  const [userPoin, setUserPoin] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const { data: userData, isLoading, isError } = useFetch(`/users?page=1&limit=100&sort_by=created_at&sort_type=asc`, "user");
  const { mutateAsync: deleteUser } = useDeleteData();

  const dataUsers = useMemo(
    () =>
      userData?.data?.users?.map((user, index) => ({
        key: user.id,
        no: index + 1,
        nama: user.name,
        email: user.email,
        point: user.point,
        badge: user.badge,
        gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
        birth_date: dayjs(user.birth_date).format("DD/MM/YYYY"),
        address: user.address,
        picture: user.picture_url,
        created: dayjs(user.created_at).format("DD/MM/YYYY | HH:mm") + " WIB",
      })) || [],
    [userData]
  );

  const columnUser = useMemo(
    () => [
      { title: "No", dataIndex: "no", key: "no", width: 50 },
      {
        title: "Nama",
        dataIndex: "nama",
        key: "nama",
        render: (text, record) => (
          <div className="flex items-center">
            <img src={record.picture} alt="User" className="w-8 h-8 rounded-full mr-2" />
            {text}
          </div>
        ),
      },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Poin", dataIndex: "point", key: "point" },
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
    setSelectedData(record);
  };

  const handleOkView = () => {
    setIsViewModalVisible(false);
  };

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setIdToDelete(record.key);
    setIsDeleteModalVisible(true);
  };

  const handleOkDelete = async () => {
    try {
      console.log(`Deleting user with ID: ${idToDelete}`);
      await deleteUser({ endpoint: `/user/${idToDelete}` });
      toast.success("Data berhasil dihapus!");
      setIsDeleteModalVisible(false);
      // Assuming dataUsers is your state variable holding user data
      // setDataUsers((prevData) => prevData.filter((user) => user.key !== idToDelete));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Terjadi kesalahan ketika menghapus data");
    }
  };

  return (
    <ContentLayout title={"Manajemen Pengguna"}>
      <section>
        <div className="p-5 bg-[#F9FAFB]">
          <div className="flex flex-col gap-8">
            <div className="px-8 py-4 shadow-md rounded-lg bg-white">
              <Tables pagination={true} initialPageSize={10} data={{ items: dataUsers, totalCount: userData?.data?.total_user || 0 }} columns={columnUser} loading={isLoading} />
            </div>
          </div>
        </div>
        <ViewModal isVisible={isViewModalVisible} onOk={handleOkView} onCancel={() => setIsViewModalVisible(false)} initialPoin={userPoin} userData={selectedData} />
        <DeleteModal isVisible={isDeleteModalVisible} onOk={handleOkDelete} onCancel={() => setIsDeleteModalVisible(false)} record={recordToDelete} />
      </section>
    </ContentLayout>
  );
}
