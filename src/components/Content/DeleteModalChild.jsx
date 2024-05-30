import DeleteImage from "../../assets/image/DeleteImage.png"

export default function DeleteModalChildren({onOk, onCancel}) {
  return (
    <div className="flex flex-col p-2 gap-2 justify-center items-center">
      <div className="w-[307px]">
        <img src={DeleteImage} alt="Delete Image" />
      </div>
      <h4 className="h4 font-bold">Anda yakin ingin menghapus artikel ini?</h4>
      <p className="body-m text-center text-[#959595]">
        Jika Anda menghapus artikel ini, Anda tidak dapat
        <br />
        memulihkannya.
      </p>
      <div className="flex gap-2 w-full px-[78px] mt-4">
        <button
          type="button"
          className="flex-1 rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4"
          onClick={onCancel}
        >
          Batal
        </button>
        <button
          type="submit"
          className="flex-1 rounded-[5px] bg-danger-500 text-white btn-l font-bold py-4"
          onClick={onOk}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}