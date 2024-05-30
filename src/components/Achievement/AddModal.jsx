import { Modal } from "antd";
import { useState } from "react";

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

  const handleThumbnailChange = (e) => {
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
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
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
}

export default AddModal