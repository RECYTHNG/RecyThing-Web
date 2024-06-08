import { useState } from "react";
import ApproveImage from "/assets/images/ApproveImage.png"
import DisapproveImage from "/assets/images/DisapproveImage.png"

export const ApproveModalChildren = ({ onOk, onCancel }) => (
  <div className="flex flex-col gap-5 justify-center items-center">
    <img src={ApproveImage} alt="Approve Image" />
    <h5 className="h5 font-semibold">
      Apakah kamu yakin ingin menyetujui pada misi ini?
    </h5>
    <p className="body-m">Data yang telah disetujui tidak dapat dipulihkan.</p>
    <div className="flex gap-2 w-full">
      <button
        type="button"
        className="flex-1 rounded-[5px] bg-transparent border border-primary-500 text-primary-500 btn-l font-bold py-4"
        onClick={onCancel}
      >
        Batal
      </button>
      <button
        type="submit"
        className="flex-1 rounded-[5px] bg-success-500 text-white btn-l font-bold py-4"
        onClick={onOk}
      >
        Setuju
      </button>
    </div>
  </div>
);

export const DisapproveModalChildren = ({ onOk, onCancel }) => {
  const [reason, setReason] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleOk = () => {
    onOk(reason);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <img src={DisapproveImage} alt="Disapprove Image" />
      <h5 className="h5 font-semibold">
        Apakah Anda yakin untuk menolak pada misi ini?
      </h5>
      <div className="bg-white w-full rounded-b-lg">
        <div className="relative bg-inherit">
          <textarea
            id="alasan"
            name="alasan"
            className="w-full peer bg-transparent h-[104px] rounded-lg text-gray-700 ring-1 px-3 py-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
            placeholder={isFocused ? "Masukkan Alasan" : ""}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(reason !== "")}
            onChange={(e) => setReason(e.target.value)}
            value={reason}
            rows={10}
          />
          <label
            htmlFor="alasan"
            className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary-500 peer-focus:text-sm transition-all"
          >
            Alasan
          </label>
        </div>
      </div>
      <p className="body-m">Data yang telah ditolak tidak dapat dipulihkan.</p>
      <div className="flex gap-2 w-full">
        <button
          type="button"
          className="flex-1 rounded-[5px] bg-transparent border border-primary-500 text-primary-500 btn-l font-bold py-4"
          onClick={onCancel}
        >
          Batal
        </button>
        <button
          type="submit"
          className={`flex-1 rounded-[5px] bg-danger-500 text-white btn-l font-bold py-2 px-4 ${
            !reason ? "bg-gray-500 cursor-not-allowed" : ""
          }`}
          onClick={handleOk}
          disabled={!reason}
        >
          Tolak
        </button>
      </div>
    </div>
  );
};

export const DetailModal = ({
  selectedRecord,
  currentPhotoIndex,
  photosPerPage,
  currentPage,
  prevPhotos,
  nextPhotos,
  setIsDetailModalVisible,
}) => {
  return (
    <div className="flex flex-col gap-10">
      <h4 className="h4 font-bold">Detail Misi</h4>
      <div className="flex justify-between">
        <div className="flex flex-col gap-[14px]">
          <p className="sub-m font-bold text-[#616161]">Misi</p>
          <h5 className="h5 font-bold text-primary-500">
            {selectedRecord?.namaMisi}
          </h5>
          <p className="h6">
            by{" "}
            <span className="font-semibold text-[#118E45]">
              {selectedRecord?.pelaksana}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-[14px]">
          <p className="sub-m font-bold text-[#616161]">Batas Akhir</p>
          <h5 className="h5 font-bold text-primary-500">
            {selectedRecord?.batasAkhir}
          </h5>
        </div>
      </div>
      <div className="flex">
        <h4 className="h4 font-bold mr-24">{currentPage}</h4>
        <div className="grid grid-cols-3 gap-10">
          {selectedRecord?.photos
            .slice(currentPhotoIndex, currentPhotoIndex + photosPerPage)
            .map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Photo ${index}`}
                  className="w-full h-full rounded-md"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-[10px]">
          <p className="text-primary-500 btn-m font-semibold">Keterangan</p>
          <p className="body-s">{selectedRecord?.keterangan}</p>
        </div>
        <div className="flex flex-col gap-[10px] text-end">
          <p className="text-primary-500 btn-m font-semibold">
            Waktu Pengunggahan Bukti
          </p>
          <p className="body-s">{selectedRecord?.waktuUpload}</p>
        </div>
      </div>
      <div className="flex justify-end gap-[10px] mt-4">
        {currentPhotoIndex > 0 && (
          <button
            type="button"
            className="rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4 px-6"
            onClick={prevPhotos}
          >
            Kembali
          </button>
        )}
        <button
          type="button"
          className="rounded-[5px] bg-primary-500 text-white btn-l font-bold py-4 px-6"
          onClick={
            currentPhotoIndex + photosPerPage >= selectedRecord?.photos.length
              ? () => setIsDetailModalVisible(false)
              : nextPhotos
          }
        >
          {currentPhotoIndex + photosPerPage >= selectedRecord?.photos.length
            ? "Tutup"
            : "Berikutnya"}
        </button>
      </div>
    </div>
  );
};