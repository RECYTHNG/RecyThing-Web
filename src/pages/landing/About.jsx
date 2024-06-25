import AboutLogo from "../../assets/image/about-image.png";

export default function About() {
  return (
    <section id="about-us" className="hero-container w-full py-[50px] md:py-[150px] px-4 md:px-[35px]">
      <div className="flex flex-col md:flex-row justify-between items-center md:px-[60px] md:space-x-16">
        <div className="left mb-8 md:mb-0 w-full flex justify-center md:justify-start">
          <img src={AboutLogo} alt="about-us" className="w-full h-auto mt-0 md:mt-[-70px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl" />
        </div>
        <div className="right text-center md:text-left w-full md:w-auto">
          <div>
            <h1 className="text-[34px] md:text-[54px] font-bold text-primary-500">
              Tentang Recy<span className="text-secondary-500">Thing</span>
            </h1>
          </div>
          <div>
            <p className="text-[18px] md:text-[24px] text-dark-800 pt-[20px]">
              RecyThing adalah pemimpin di industri daur ulang sampah yang berkomitmen untuk menjaga lingkungan hidup yang lebih bersih dan lebih berkelanjutan.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8 pt-[27px] space-y-8 md:space-y-0">
            <div className="bg-secondary-50 py-[14px] px-[14px] rounded-[8px]">
              <h1 className="text-primary-500 text-[20px] font-semibold">Visi Kami</h1>
              <p className="text-dark-800 text-[16px]">
                Menciptakan masyarakat yang sadar lingkungan di mana setiap individu berperan aktif dalam melestarikan bumi kita.
              </p>
            </div>
            <div className="bg-secondary-50 py-[14px] px-[14px] rounded-[8px]">
              <h1 className="text-primary-500 text-[20px] font-semibold">Komitmen Kami</h1>
              <p className="text-dark-800 text-[16px]">
                Prioritaskan penggunaan teknologi terbaru dan praktik terbaik dalam proses daur ulang untuk mengurangi dampak lingkungan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
