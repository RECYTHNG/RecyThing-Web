import littering from "../../assets/image/fitur-littering.png";
import rubbish from "../../assets/image/fitur-rubbish.png";
import achievements from "../../assets/image/fitur-achievements.png";
import article from "../../assets/image/fitur-article-video.png";
import challenge from "../../assets/image/fitur-challenge.png";

const features = [
  {
    img: littering,
    title: "Report Littering",
    description: "Melaporkan pembuangan sampah kecil sembarangan dengan lokasi, foto, dan deskripsi"
  },
  {
    img: rubbish,
    title: "Report Rubbish",
    description: "Melaporkan pembuangan tumpukan sampah sembarangan dengan lokasi, foto, dan deskripsi"
  },
  {
    img: achievements,
    title: "Achievements",
    description: "Penghargaan kepada pengguna atas kontribusi lingkungan, mendorong tindakan berkelanjutan"
  },
  {
    img: article,
    title: "Article & Video Content",
    description: "Panduan lengkap tentang daur ulang untuk memudahkan pengguna memahami praktik ramah lingkungan"
  },
  {
    img: challenge,
    title: "Challenge",
    description: "Berpartisipasi dalam aktivitas lingkungan yang menyenangkan dan bermanfaat untuk mengedukasi terhadap praktik daur ulang"
  }
];

export default function CardFunction() {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-8 md:px-[110px]">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center p-4 shadow-md rounded-lg w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] mb-6">
          <img src={feature.img} alt={feature.title} className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32" />
          <div className="pt-4 text-center">
            <h1 className="text-secondary-500 font-bold text-[18px] md:text-[24px]">{feature.title}</h1>
            <p className="text-[14px] md:text-[18px] text-dark-800">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
