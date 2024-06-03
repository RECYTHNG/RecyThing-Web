import Logo from "../../assets/image/hero-img.png";

export default function Hero() {
  return (
    <div>
      <div className="bg-[#E6F4FC] w-full pb-[150px] pt-[30px] ">
        <div className="flex flex-row justify-between items-center px-[75px]">
          <div className="text">
            <div className="text-[54px] font-bold ">
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
            <div className="text-[24px] text-dark-800 pt-5">
              <p>
                Temukan cara mudah dan seru untuk berkontribusi merawat&nbsp; <br /> lingkungan sekitarmu bersama RecyThing!{" "}
              </p>
            </div>
            {/* <div className="btnn pt-10  ">
              <button className="rounded-[48px] bg-[#00476D] text-[20px] text-white font-semibold py-4 px-12 text-center justify-center shadow-sm md:hover:shadow-lg">Unduh Sekarang!</button>
            </div> */}
            <div className="btnn pt-10">
              <button className="rounded-[48px] bg-[#00476D] text-[20px] text-white font-semibold py-4 px-12 text-center justify-center shadow-sm transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                Unduh Sekarang!
              </button>
            </div>
          </div>
          <div>
            <img src={Logo} alt="hero-img" className="w-[585px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
