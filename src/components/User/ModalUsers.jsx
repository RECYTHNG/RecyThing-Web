import { Modal } from "antd";
import { useState, useEffect } from "react";
import DeleteImage from "/assets/images/DeleteImage.png";
import UserImage from "../../assets/image/profil-jack.png";
import poin from "../../assets/svg/poin.svg";

export const DeleteModal = ({ isVisible, onOk, onCancel, record }) => {
  return (
    <Modal open={isVisible} onOk={() => onOk(record.id)} onCancel={onCancel} width={569} footer={null}>
      <div className="flex flex-col p-2 gap-2 justify-center items-center">
        <div className="w-[307px]">
          <img src={DeleteImage} alt="Delete Image" />
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
          <button type="submit" className="flex-1 rounded-[5px] bg-danger-500 text-white btn-l font-bold py-4" onClick={() => onOk(record.id)}>
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const ViewModal = ({ isVisible, onOk, onCancel, record, initialPoin, userData }) => {
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [foto, setFoto] = useState(UserImage); // Default image

  const [isFocused, setIsFocused] = useState({
    nama: false,
    jenisKelamin: false,
    tempatLahir: false,
    tanggalLahir: false,
    email: false,
    alamat: false,
  });

  useEffect(() => {
    if (userData) {
      setNama(userData.nama || "Emily White");
      setJenisKelamin(userData.jenisKelamin || "");
      setTempatLahir(userData.tempatLahir || "");
      setTanggalLahir(userData.tanggalLahir || "");
      setEmail(userData.email || "");
      setAlamat(userData.alamat || "");
      setFoto(userData.foto || UserImage);
    }
  }, [userData]);

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecord = {
      id: record.id,
      nama,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      email,
      alamat,
      foto,
    };
    onOk(updatedRecord);
  };

  return (
    <Modal open={isVisible} onOk={handleSubmit} onCancel={onCancel} width={403} footer={null}>
      <div className="flex flex-col">
        <h4 className="text-[18px] font-bold pb-5">Detail Pengguna</h4>
        <form className="w-full flex flex-col gap-[20px]" onSubmit={handleSubmit}>
          <div className="relative bg-white rounded-lg overflow-hidden flex justify-center items-center h-[200px]">
            <img src={foto} alt="User" className="rounded-sm flex justify-center items-center object-cover" />
          </div>
          <div className="flex justify-between items-center text-dark-700 text-[12px]">
            <div>{`Gabung: 20/10/2023 | 10:00 WIB`}</div>
            <div className="flex items-center">
              <div className="flex items-center">
                <img src={poin} alt="poin" className="pr-1 w-6 h-6" />
                <h1>1000</h1>
                <h1>{initialPoin}</h1>
              </div>
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
                onFocus={() => handleFocus("nama")}
                onBlur={() => handleBlur("nama")}
                onChange={(e) => setNama(e.target.value)}
                value={nama}
                readOnly
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
                readOnly
                className="w-full bg-transparent h-10 rounded text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none"
                placeholder="Masukan Jenis Kelamin"
                onFocus={() => handleFocus("jenisKelamin")}
                onBlur={() => handleBlur("jenisKelamin")}
                value={jenisKelamin}
              />
              <label htmlFor="jenisKelamin" className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 transition-all">
                Jenis Kelamin
              </label>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input
                type="date"
                id="tanggalLahir"
                name="tanggalLahir"
                readOnly
                className="w-full bg-transparent h-10 rounded text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none"
                placeholder="Masukan Tanggal Lahir"
                onFocus={() => handleFocus("tanggalLahir")}
                onBlur={() => handleBlur("tanggalLahir")}
                value={tanggalLahir}
              />
              <label htmlFor="tanggalLahir" className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 transition-all">
                Tempat/Tanggal Lahir
              </label>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input
                type="email"
                id="email"
                name="email"
                readOnly
                className="w-full bg-transparent h-10 rounded text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none"
                placeholder="Masukkan email"
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                value={email}
              />
              <label htmlFor="email" className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 transition-all">
                Email
              </label>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="relative bg-inherit">
              <input
                type="text"
                id="alamat"
                name="alamat"
                readOnly
                className="w-full peer bg-transparent h-10 rounded text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none"
                placeholder="Masukan Alamat"
                onFocus={() => handleFocus("alamat")}
                onBlur={() => handleBlur("alamat")}
                value={alamat}
              />
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
