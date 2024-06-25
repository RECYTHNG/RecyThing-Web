import logo from "../../assets/image/recything-logo.png";
import call from "../../assets/svg/call.svg";
import location from "../../assets/svg/location.svg";
import facebook from "../../assets/svg/facebook.svg";
import youtube from "../../assets/svg/youtube.svg";
import instagram from "../../assets/svg/instagram.svg";
import path from "../../assets/svg/path.svg";
import appstore from "../../assets/image/logo-appstore.png";
import googleplay from "../../assets/image/logo-googleplay.png";

export default function Footer() {
  return (
    <div className="footer-container bg-[#E6F4FC] py-8 md:py-[58px] px-6 md:px-[100px]">
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-[105px]">
        <div className="left flex flex-col gap-5 items-center md:items-start text-center md:text-left">
          <img src={logo} alt="recything" className="w-[120px] md:w-[184px] h-auto" />
          <p className="flex text-[12px] md:text-[14px] font-semibold justify-center md:justify-start">
            <img src={location} alt="location" className="mr-2 md:mr-5" />
            Jalan Perdagangan Komplek HKSN Permai Blok 8C No. 42, Banjarmasin
          </p>
          <p className="flex text-[12px] md:text-[14px] font-semibold justify-center md:justify-start">
            <img src={call} alt="call" className="mr-2 md:mr-5" />
            +62 858 0808 0808
          </p>
          <div className="flex gap-4 md:gap-6 justify-center md:justify-start">
            <img src={facebook} alt="facebook" className="w-5 md:w-auto" />
            <img src={youtube} alt="youtube" className="w-5 md:w-auto" />
            <img src={instagram} alt="instagram" className="w-5 md:w-auto" />
            <img src={path} alt="path" className="w-5 md:w-auto" />
          </div>
        </div>
        <div className="mid flex flex-col md:flex-row gap-6 md:gap-11 text-[16px] md:text-[18px] w-full md:w-2/4">
          <div className="space-y-2 md:space-y-6 text-center md:text-left">
            <h1 className="font-bold">Perusahaan</h1>
            <p>Tentang Kami</p>
            <p>Kontak</p>
            <p>Blog</p>
          </div>
          <div className="space-y-2 md:space-y-6 text-center md:text-left">
            <h1 className="font-bold">Solusi</h1>
            <p>Semua Orang</p>
            <p>Perusahaan</p>
          </div>
          <div className="space-y-2 md:space-y-6 text-center md:text-left">
            <h1 className="font-bold">Lainnya</h1>
            <p>Kebijakan Privasi</p>
            <p>Syarat dan Ketentuan</p>
            <p>FAQ</p>
          </div>
        </div>
        <div className="right flex flex-col gap-4 items-center md:items-start">
          <div className="flex flex-col gap-4">
            <a href="https://www.apple.com/id/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={appstore} alt="app store" className="w-[150px] md:w-[200px]" />
            </a>
            <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer">
              <img src={googleplay} alt="google play" className="w-[150px] md:w-[200px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
