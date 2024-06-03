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
    <div className="footer-container">
      <div className="flex w-full gap-[105px] py-[58px] px-[100px] bg-[#E6F4FC]">
        <div className="left flex flex-col gap-5">
          <img src={logo} alt="recything" className="w-[184px] h-auto" />
          <p className="flex text-[14px] font-semibold">
            <img src={location} alt="location" className="mr-5"/>
            Jalan Perdagangan Komplek HKSN Permai Blok 8C No. 42, Banjarmasin
          </p>
          <p className="flex text-[14px]  font-semibold ">
            <img src={call} alt="call"  className="mr-5"/>
            +62 858 0808 0808
          </p>
          <div className="flex gap-6 ">
            <img src={facebook} alt="facebook" />
            <img src={youtube} alt="youtube" />
            <img src={instagram} alt="instagram" />
            <img src={path} alt="path" />
          </div>
        </div>
        <div className="mid flex gap-11 text-[18px] w-2/4">
          <div className="space-y-6">
            <h1 className="font-bold">Perusahaan</h1>
            <p>Tentang Kami</p>
            <p>Kontak</p>
            <p>Blog</p>
          </div>
          <div className="space-y-6">
            <h1 className="font-bold">Solusi</h1>
            <p>Semua Orang</p>
            <p>Perusahaan</p>
          </div>
          <div className="space-y-6">
            <h1 className="font-bold">Lainnya</h1>
            <p>Kebijakan Privasi</p>
            <p>Syarat dan Ketentuan</p>
            <p>FAQ</p>
          </div>
        </div>
        <div className="right flex flex-col gap-4 ">
          <div className="flex flex-col gap-4">
            <a href="https://www.apple.com/id/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={appstore} alt="app store" className="w-[200px]" />
            </a>
            <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer">
              <img src={googleplay} alt="google play" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
