import { Modal } from "antd";
import { useState, useEffect } from "react";
import DeleteImage from "/assets/images/DeleteImage.png";
import poin from "../../assets/svg/poin.svg";

export const DeleteModal = ({ isVisible, onOk, onCancel, record }) => {
  return (
    <Modal open={isVisible} onOk={() => onOk(record.key)} onCancel={onCancel} width={569} footer={null}>
      <div className="flex flex-col p-2 gap-2 justify-center items-center">
        <div className="w-[307px]">
          <img src={DeleteImage} alt="Delete" />
        </div>
        <h4 className="h4 font-bold text-center">
          Apakah Anda yakin untuk menghapus <br />
          data ini?
        </h4>
        <p className="body-m text-center text-[#959595]">Data yang telah di hapus tidak dapat dipulihkan.</p>
        <div className="flex gap-2 w-full px-[78px] mt-4">
          <button type="button" className="flex-1 rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4" onClick={onCancel}>
            Batal
          </button>
          <button type="submit" className="flex-1 rounded-[5px] bg-danger-500 text-white btn-l font-bold py-4" onClick={() => onOk(record.key)}>
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const ViewModal = ({ isVisible, onOk, onCancel, initialPoin, userData }) => {
  const [userDetails, setUserDetails] = useState({
    nama: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    email: "",
    alamat: "",
    foto: "",
    point: "",
  });

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setUserDetails({
        nama: userData.nama || "",
        gender: userData.gender || "",
        birth: userData.birth_date || "",
        email: userData.email || "",
        alamat: userData.address || "",
        foto: userData.picture,
        point: userData.point || "",
        created: userData.created || "",
      });
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onOk({ ...userData, ...userDetails });
  };

  return (
    <Modal open={isVisible} onOk={handleSubmit} onCancel={onCancel} width={403} footer={null}>
      <div className="flex flex-col">
        <h4 className="text-[18px] font-bold pb-5">Detail Pengguna</h4>
        <form className="w-full flex flex-col gap-[20px]" onSubmit={handleSubmit}>
          <div className="relative bg-white rounded-lg overflow-hidden flex justify-center items-center h-[200px]">
            <img src={userDetails.foto} alt="User" className="rounded-sm flex justify-center items-center object-cover" />
          </div>
          <div className="flex justify-between items-center text-dark-700 text-[12px]">
            <div>Gabung : {userDetails.created}</div>
            <div className="flex items-center">
              <img src={poin} alt="poin" className="pr-1 w-6 h-6" />
              <h1>{userDetails.point}</h1>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input
                type="text"
                id="nama"
                name="nama"
                className="w-full bg-transparent h-10 rounded text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none"
                placeholder="Masukan Nama"
                value={userDetails.nama}
                disabled
              />
              <label htmlFor="nama" className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 transition-all">
                Nama Lengkap
              </label>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input
                type="text"
                id="jenisKelamin"
                name="jenisKelamin"
                className="w-full bg-transparent h-10 rounded text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none"
                placeholder="Masukan Jenis Kelamin"
                value={userDetails.gender}
                disabled
              />
              <label htmlFor="jenisKelamin" className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 transition-all">
                Jenis Kelamin
              </label>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input
                // type="date"
                id="tanggalLahir"
                name="tanggalLahir"
                className="w-full bg-transparent h-10 rounded text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none"
                value={userDetails.birth}
                disabled
              />
              <label htmlFor="tanggalLahir" className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 transition-all">
                Tanggal Lahir
              </label>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input type="email" id="email" name="email" className="w-full bg-transparent h-10 rounded text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none" value={userDetails.email} disabled />
              <label htmlFor="email" className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 transition-all">
                Email
              </label>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input type="text" id="alamat" name="alamat" className="w-full peer bg-transparent h-10 rounded text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none" value={userDetails.alamat} disabled />
              <label htmlFor="alamat" className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 transition-all">
                Alamat
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className="rounded-[5px] bg-transparent border text-primary-500 border-primary-500 btn-l font-bold py-4 px-6" onClick={onCancel}>
              Kembali
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
