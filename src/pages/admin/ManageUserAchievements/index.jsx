import { ActionIcons, AddCircleIcon } from "../../../assets/icons";
import { useMemo, useState } from "react";
import GoldMedal from "../../../assets/image/GoldMedal.png";
import SilverMedal from "../../../assets/image/SilverMedal.png";
import ClassicMedal from "../../../assets/image/ClassicMedal.png";
import Tables from "../../../components/global/Table";
import { formatNumber } from "../../../utils/formatNumbers";
import { Modal } from "antd";
import { toast } from "react-toastify";

function AddModal({ isVisible, onOk, onCancel }) {
  const [level, setLevel] = useState("");
  const [totalPoin, setTotalPoin] = useState("");
  const [badgeImage, setBadgeImage] = useState(null);
  const [isFocused, setIsFocused] = useState({
    level: false,
    totalPoin: false,
  });
  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBadgeImage(URL.createObjectURL(e.target.files[0]));
    }
  };

    const handleTotalPoinChange = (e) => {
    const input = e.target.value;
    const numericValue = input.replace(/\D/g, ''); // Remove non-numeric characters
    setTotalPoin(formatNumber(numericValue));
  };

  return (
    <Modal
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      width={518}
      footer={null}
    >
      <div className="flex flex-col p-[10px] gap-2 justify-center items-center">
        <h4 className="h4 font-bold pb-5">Tambah Pencapaian</h4>
        <form className="w-full flex flex-col px-5 gap-[38px]">
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input
                type="text"
                id="level"
                name="level"
                className="w-full peer bg-transparent h-10 rounded-lg text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
                placeholder={isFocused.level ? "Masukan level" : ""}
                onFocus={() => handleFocus("level")}
                onBlur={() => handleBlur("level")}
                onChange={(e) => setLevel(e.target.value)}
                value={level}
              />
              <label
                htmlFor="level"
                className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary-500 peer-focus:text-sm transition-all"
              >
                Level
              </label>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input
                type="number"
                id="totalPoin"
                name="totalPoin"
                className="w-full peer bg-transparent h-10 rounded-lg text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
                placeholder={isFocused.totalPoin ? "Masukan Total Point" : ""}
                onFocus={() => handleFocus("totalPoin")}
                onBlur={() => handleBlur("totalPoin")}
                onChange={(e) => setTotalPoin(e.target.value)}
                value={totalPoin}
              />
              <label
                htmlFor="totalPoin"
                className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary-500 peer-focus:text-sm transition-all"
              >
                Total Poin
              </label>
            </div>
          </div>
          <div className="border-2 border-dashed border-gray-300 px-2 py-1 self-start rounded-lg cursor-pointer flex flex-col hover:border-gray-400 relative">
            {badgeImage ? (
              <img
                src={badgeImage}
                alt="Thumbnail Preview"
                className="rounded-md w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-500">
                Unggah Lencana
              </div>
            )}
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="opacity-0 absolute inset-0 cursor-pointer"
            />
          </div>
          <div className="flex gap-2 w-full px-[78px] mt-4">
            <button
              type="button"
              className="flex-1 rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4"
              onClick={onCancel}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-[5px] bg-primary-500 text-white btn-l font-bold py-4"
              onClick={onOk}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default function ManageUserAchivements() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const badge = useMemo(
    () => ({
      Gold: (
        <div className="inline-flex items-center gap-1 bg-[#EFEFEF] rounded-badge border border-primary-500 px-5 py-[6px] w-24">
          <img src={GoldMedal} alt="Gold Badge" />
          <span className="text-xs text-primary-500 font-semibold">Gold</span>
        </div>
      ),
      Silver: (
        <div className="inline-flex items-center gap-1 bg-[#EFEFEF] rounded-badge border border-primary-500 px-5 py-[6px] w-24">
          <img src={SilverMedal} alt="Silver Badge" />
          <span className="text-xs text-primary-500 font-semibold">Silver</span>
        </div>
      ),
      Classic: (
        <div className="inline-flex items-center gap-1 bg-[#EFEFEF] rounded-badge border border-primary-500 px-5 py-[6px] w-24">
          <img src={ClassicMedal} alt="Bronze Badge" />
          <span className="text-xs text-primary-500 font-semibold">
            Classic
          </span>
        </div>
      ),
    }),
    []
  );

  const dataAchievements = useMemo(
    () => [
      {
        id: 1,
        level: "Gold",
        lencana: badge.Gold,
        target: formatNumber(175000),
        aksi: <ActionIcons />,
      },
      {
        id: 2,
        level: "Silver",
        lencana: badge.Silver,
        target: formatNumber(5000),
        aksi: <ActionIcons />,
      },
      {
        id: 3,
        level: "Classic",
        lencana: badge.Classic,
        target: formatNumber(0),
        aksi: <ActionIcons />,
      },
    ],
    [badge]
  );

  const columnAchievements = useMemo(
    () => [
      { title: "No", dataIndex: "id", key: "id", width: 106 },
      { title: "Level", dataIndex: "level", key: "level" },
      { title: "Lencana", dataIndex: "lencana", key: "lencana" },
      { title: "Target Point", dataIndex: "target", key: "target" },
      { title: "Aksi", dataIndex: "aksi", key: "aksi", width: 106 },
    ],
    []
  );

  const dataUserAchievements = useMemo(
    () => [
      {
        id: 1,
        nama: "John Doe",
        lencana: badge.Gold,
        totalPoin: formatNumber(200000),
        lokasi: "Jakarta",
      },
      {
        id: 2,
        nama: "Jane Smith",
        lencana: badge.Silver,
        totalPoin: formatNumber(100000),
        lokasi: "Bandung",
      },
      {
        id: 3,
        nama: "Alice Johnson",
        lencana: badge.Classic,
        totalPoin: formatNumber(50000),
        lokasi: "Surabaya",
      },
    ],
    [badge]
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
    setIsModalVisible(true);
  };

  const handleOk = () => {
    toast.success("Berhasil Menambahkan Level");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
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
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </section>
  );
}
