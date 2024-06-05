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
    <div>
      <div className="px-[244px] py-[115px]">
        <h1 className="flex justify-center pb-10 text-[54px] text-secondary-500 font-bold ">Partner&nbsp;<span className="text-primary-500">Kami</span></h1>
        <div className="gap-[62px]" style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap"}}>
            <img src={alterra} alt="alterra" />
            <img src={sayurbox} alt="sayurbox" />
            <img src={segari} alt="segari" />
            <img src={kopken} alt="kopken" />
            <img src={indomie} alt="indomie" />
            <img src={abc} alt="abc" />
            <img src={shopee} alt="shopee" />
            <img src={unilever} alt="unilever" />
            <img src={hokben} alt="hokben" />
            <img src={excelso} alt="excelso" />
        </div>
      </div>
    </div>
  );
}
