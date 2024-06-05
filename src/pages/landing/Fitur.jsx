import CardFunction from "../../components/landing/cardFitur";

export default function Fitur() {
  return (
    <div>
      <div className="flex text-center justify-center w-full px-[110px] py-[50px] ">
        <div className="flex-col">
          <div className="">
            <h1 className="text-[54px] text-secondary-500 font-bold">
              Fitur Unggulan <span className="text-primary-500">Kami</span>
            </h1>
            <div>
              <p className="text-[24px] text-dark-800 pt-5">
                Temukan fitur - fitur RecyThing yang akan membuatmu jadi Pahlawan <br />
                Lingkungan!
              </p>
            </div>
          </div>
          <div>
            <CardFunction />
          </div>
        </div>
      </div>
    </div>
  );
}
