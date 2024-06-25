import Logo from "../../assets/image/hero-img.png";

export default function Hero() {
  return (
    <div className="bg-[#E6F4FC] w-full pb-[50px] md:pb-[150px] pt-[30px]">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-[75px]">
        <div className="text text-center md:text-left">
          <div className="text-[24px] sm:text-[28px] md:text-[34px] lg:text-[54px] font-bold">
            <h1 className="text-[#00476D]">
              Mulai Aksi Nyatamu
              <br />
              sebagai&nbsp;
              <span className="text-secondary-500">
                Pahlawan Peduli
                <br />
                Lingkungan
              </span>
            </h1>
          </div>
          <div className="text-[16px] sm:text-[18px] md:text-[24px] text-dark-800 pt-5">
            <p>
              Temukan cara mudah dan seru untuk berkontribusi merawat&nbsp;
              <br className="hidden md:block" />
              lingkungan sekitarmu bersama RecyThing!
            </p>
          </div>
          <div className="btnn pt-10">
            <button className="rounded-[48px] bg-[#00476D] text-[16px] sm:text-[18px] md:text-[20px] text-white font-semibold py-4 px-8 md:px-12 text-center justify-center shadow-sm transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
              Unduh Sekarang!
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <img src={Logo} alt="hero-img" className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl" />
        </div>
      </div>
    </div>
  );
}
