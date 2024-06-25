import CardFunction from "../../components/landing/cardFitur";

export default function Fitur() {
  return (
    <section id="fitur">
      <div className="flex text-center justify-center w-full px-4 md:px-[110px] py-[50px] md:py-[100px]">
        <div className="flex-col w-full">
          <div>
            <h1 className="text-[32px] md:text-[54px] text-secondary-500 font-bold">
              Fitur Unggulan <span className="text-primary-500">Kami</span>
            </h1>
            <div>
              <p className="text-[16px] md:text-[24px] text-dark-800 pt-5">
                Temukan fitur-fitur RecyThing yang akan membuatmu jadi Pahlawan Lingkungan!
              </p>
            </div>
          </div>
          <div>
            <CardFunction />
          </div>
        </div>
      </div>
    </section>
  );
}