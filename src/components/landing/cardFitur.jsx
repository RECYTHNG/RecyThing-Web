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
    <div className="flex px-[110px]">
      <div className="cardd space-x-6">
        {features.map((feature, index) => (
          <div key={index} className="items p-8 shadow-md flex flex-col justify-center items-center">
            <img src={feature.img} alt={feature.title} />
            <div className="pt-4">
              <h1 className="text-secondary-500 font-bold text-[24px]">{feature.title}</h1>
              <p className="text-[18px] text-dark-800">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
