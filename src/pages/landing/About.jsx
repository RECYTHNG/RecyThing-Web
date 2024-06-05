import AboutLogo from "../../assets/image/about-image.png";

export default function About() {
  return (
    <div className="hero-container w-full py-[150px] px-[35px] ">
      <div className="flex flex-row justify-between item-center px-[60px] space-x-16">
        <div className="left">
          <img src={AboutLogo} alt="about-us" className="w-[1500px] h-auto  mt-[-70px]" />
        </div>
        <div className="right">
          <div>
            <h1 className="text-[54px] font-bold text-primary-500">
              Tentang Recy<span className="text-secondary-500">Thing</span>
            </h1>
          </div>
          <div>
            <p className="text-[24px] text-dark-800 pt-[20px]">RecyThing adalah pemimpin di industri daur ulang sampah yang berkomitmen untuk menjaga lingkungan hidup yang lebih bersih dan lebih berkelanjutan.</p>
          </div>
          <div className="flex flex-row space-x-8 pt-[27px]">
            <div className=" bg-secondary-50 py-[14px] px-[14px] rounded-[8px]">
              <h1 className="text-primary-500 text-[20px] font-semibold">Visi Kami</h1>
              <p className="text-dark-800 text-[16px]">Menciptakan masyarakat yang sadar lingkungan di mana setiap individu berperan aktif dalam melestarikan bumi kita.</p>
            </div>
            <div className=" bg-secondary-50 py-[14px] px-[14px] rounded-[8px]">
              <h1 className="text-primary-500 text-[20px] font-semibold">Komitmen Kami</h1>
              <p className="text-dark-800 text-[16px]">Prioritaskan penggunaan teknologi terbaru dan praktik terbaik dalam proses daur ulang untuk mengurangi dampak lingkungan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
