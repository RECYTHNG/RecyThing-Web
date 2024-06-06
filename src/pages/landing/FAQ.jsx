import { useState } from "react";
import arrowDown from "../../assets/svg/arrow-down.svg";
import arrowUp from "../../assets/svg/arrow-up.svg";

const data = [
  {
    question: "Bagaimana cara mendaftar di Recything?",
    answer:
      "Kamu dapat mendaftar melalui aplikasi RecyThing dengan pilih opsi “Register” saat kamu pertama kali membuka aplikasi RecyThing. Kamu dapat mendaftarkan diri dengan memasukkan nama, email, password, dan nomor handphone. Setelah itu, kamu akan dapat kode OTP.",
  },
  {
    question: "Bagaimana cara melaporkan sampah kecil sembarangan?",
    answer: "Kamu dapat memilih menu lapor, kemudian pilih jenis laporan. Setelah itu, kamu bisa memilih kategori sampah, memilih lokasi sampah, mengisi deskripsi sampah, dan terakhir mengirimkan laporan dari sampah yang kamu temukan.",
  },
  {
    question: "Bagaimana cara melaporkan tumpukan sampah?",
    answer: 'Kamu dapat memilih menu “Lapor”, kemudian pilih jenis laporan, yaitu "Penumpukan Sampah". Setelah itu, kamu bisa isi deskripsi sampah, mengunggah gambar dari sampah tersebut, dan terakhir kirim laporannya.',
  },
  {
    question: "Bagaimana mengikuti misi di Recything?",
    answer: (
      <div>
        Pada navigasi aplikasi, temukan dan pilih menu "Challenge". Di sana, kamu akan menemukan daftar misi yang tersedia. Navigasikan antara tab "Aktif” untuk melihat berbagai misi yang dapat kamu ikuti dan "Selesai" untuk melihat
        berbagai misi yang sudah kamu ikuti.
        <br />- Pilih misi yang sesuai dengan minat dan ketersediaan kamu.
        <br />- Setiap misi memiliki deskripsi singkat yang menjelaskan apa yang perlu kamu lakukan.
        <br />- Setelah memilih misi, ambil tugas atau langkah-langkah yang diperlukan untuk menyelesaikan misi tersebut. Pastikan untuk membaca petunjuk dengan baik.
        <br />- Jika sudah berhasil menyelesaikan misi, kamu akan mendapatkan penghargaan berupa poin.
      </div>
    ),
  },
];

export default function FAQ() {
  const [selected, setSelected] = useState([]);

  const toggle = (i) => {
    if (selected.includes(i)) {
      setSelected(selected.filter(item => item !== i));
    } else {
      setSelected([...selected, i]);
    }
  };

  return (
    <section id="faq" className="bg-[#E6F4FC]">
      <div className="flex p-[85px] space-x-36">
        <div className="w-1/3 flex justify-center items-center">
          <h1 className="text-[54px] text-secondary-500 font-bold">
            Pertanyaan Umum <span className="text-primary-500">tentang Recy</span>Thing
          </h1>
        </div>
        <div className="wrapper">
          <div className="accordion">
            {data.map((item, i) => (
              <div
                className={`item px-9 py-7 mb-5 rounded-[10px] cursor-pointer transition-colors duration-300 ${
                  selected.includes(i) ? "bg-primary-500 text-white" : "bg-white hover:bg-primary-500 hover:text-white"
                }`}
                key={i}
                onClick={() => toggle(i)}
              >
                <div className="title flex text-[24px] justify-between items-center">
                  <p className="font-bold w-full flex items-center">
                    {item.question}
                  </p>
                  <span>{selected.includes(i) ? <img src={arrowUp} alt="Arrow Up" /> : <img src={arrowDown} alt="Arrow Down" />}</span>
                </div>
                <div className={selected.includes(i) ? "content show text-[20px] mt-6" : "content text-[20px]"}>{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
