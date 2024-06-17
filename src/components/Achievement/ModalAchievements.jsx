import { Modal } from "antd";
import { useState, useEffect } from "react";
import DeleteImage from "/assets/images/DeleteImage.png";
import { usePatchFormData } from "../../hooks/useFetch";

export const AddModal = ({ isVisible, onOk, onCancel }) => {
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

  const handleBadgeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBadgeImage(URL.createObjectURL(e.target.files[0]));
    }
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
              <div className="text-center text-gray-500">Unggah Lencana</div>
            )}
            <input
              type="file"
              id="badge"
              name="badge"
              onChange={handleBadgeChange}
              className="opacity-0 absolute inset-0 cursor-pointer"
            />
          </div>
          <div className="flex gap-2 w-full px-[78px]">
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
};

export const DeleteModal = ({ isVisible, onOk, onCancel, record }) => {
  return (
    <Modal
      open={isVisible}
      onOk={() => onOk(record.id)}
      onCancel={onCancel}
      width={569}
      footer={null}
    >
      <div className="flex flex-col p-2 gap-2 justify-center items-center">
        <div className="w-[307px]">
          <img src={DeleteImage} alt="Delete Image" />
        </div>
        <h4 className="h4 font-bold">
          Anda yakin ingin menghapus pencapaian ini?
        </h4>
        <p className="body-m text-center text-[#959595]">
          Jika Anda menghapus artikel ini, Anda tidak dapat
          <br />
          memulihkannya.
        </p>
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
            className="flex-1 rounded-[5px] bg-danger-500 text-white btn-l font-bold py-4"
            onClick={() => onOk(record.id)}
          >
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const EditModal = ({ isVisible, onOk, onCancel, record }) => {
  const [level, setLevel] = useState(record ? record.level : "");
  const [totalPoin, setTotalPoin] = useState(record ? record.target_point : "");
  const [badgeImage, setBadgeImage] = useState(record ? record.lencana.props.src : null);
  const [isFocused, setIsFocused] = useState({
    level: false,
    totalPoin: false,
  });

  const { mutateAsync: updateAchievement } = usePatchFormData();

  useEffect(() => {
    if (record) {
      setLevel(record.level);
      setTotalPoin(record.target_point);
      setBadgeImage(record.lencana.props.src);
    }
  }, [record]);

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("level", level);
    formData.append("target_point", totalPoin);
  
    try {
      if (record && record.id) {
        await updateAchievement({
          endpoint: `/achievements/${record.id}`,
          updatedData: formData,
        });
  
        const updatedRecord = {
          ...record,
          level,
          target: totalPoin,
          lencana: <img src={badgeImage} alt="Updated Badge" className="w-20" />
        };
        onOk(updatedRecord);
      }
    } catch (error) {
      console.error("Error updating achievement:", error);
    }
  };  

  return (
    <Modal
      open={isVisible}
      onOk={handleSubmit}
      onCancel={onCancel}
      width={518}
      footer={null}
    >
      <div className="flex flex-col p-[10px] gap-2 justify-center items-center">
        <h4 className="h4 font-bold pb-5">Edit Pencapaian</h4>
        <form className="w-full flex flex-col px-5 gap-[38px]" onSubmit={handleSubmit}>
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
          <div className="px-2 py-1 max-w-36 self-start">
            {badgeImage ? (
              <img
                src={badgeImage}
                alt="Badge Preview"
                className="rounded-md w-full max-w-xs object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                }}
              />
            ) : (
              <div className="text-center text-gray-500">Tidak ada data lencana</div>
            )}
          </div>
          <div className="flex gap-2 w-full px-[78px]">
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
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
