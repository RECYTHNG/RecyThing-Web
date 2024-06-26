import alterra from "../../assets/image/partner-alterra.png";
import sayurbox from "../../assets/image/partner-sayurbox.png";
import segari from "../../assets/image/partner-segari.png";
import kopken from "../../assets/image/partner-kopi-kenangan.png";
import indomie from "../../assets/image/partner-indomie.png";
import abc from "../../assets/image/partner-abc.png";
import shopee from "../../assets/image/partner-shopee.png";
import unilever from "../../assets/image/partner-unilever.png";
import hokben from "../../assets/image/partner-hokben.png";
import excelso from "../../assets/image/partner-excelso.png";

export default function Partner() {
  return (
    <section id="partner">
      <div className="px-4 md:px-[244px] py-10 md:py-[115px]">
        <h1 className="flex justify-center pb-5 md:pb-10 text-[32px] md:text-[54px] text-secondary-500 font-bold text-center">
          Partner&nbsp;<span className="text-primary-500">Kami</span>
        </h1>
        <div className="flex justify-center items-center flex-wrap gap-4 md:gap-[62px]">
          <img src={alterra} alt="alterra" className="w-[70px] h-auto md:w-auto" />
          <img src={sayurbox} alt="sayurbox" className="w-[70px] h-auto md:w-auto" />
          <img src={segari} alt="segari" className="w-[70px] h-auto md:w-auto" />
          <img src={kopken} alt="kopken" className="w-[70px] h-auto md:w-auto" />
          <img src={indomie} alt="indomie" className="w-[70px] h-auto md:w-auto" />
          <img src={abc} alt="abc" className="w-[70px] h-auto md:w-auto" />
          <img src={shopee} alt="shopee" className="w-[70px] h-auto md:w-auto" />
          <img src={unilever} alt="unilever" className="w-[70px] h-auto md:w-auto" />
          <img src={hokben} alt="hokben" className="w-[70px] h-auto md:w-auto" />
          <img src={excelso} alt="excelso" className="w-[70px] h-auto md:w-auto" />
        </div>
      </div>
    </section>
  );
}
