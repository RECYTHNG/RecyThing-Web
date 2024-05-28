import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddImageIcon } from "../../../assets/icons";
import { RxCheck } from "react-icons/rx";
import articles from "./articles.json";
import DeleteImage from "../../../assets/image/DeleteImage.png";
import { Modal } from "antd";

const categories = [
  "Organik",
  "Plastik",
  "Kertas",
  "Kaca",
  "Tekstil",
  "Kaleng",
  "Elektronik",
  "Lainnya",
];

function HapusModal({ isVisible, onOk, onCancel }) {
  return (
    <Modal
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      width={518}
      footer={null}
    >
      <div className="flex flex-col p-2 gap-2 justify-center items-center">
        <div className="w-[307px]">
          <img src={DeleteImage} alt="Delete Image" />
        </div>
        <h4 className="h4 font-bold">
          Anda yakin ingin menghapus artikel ini?
        </h4>
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
    </Modal>
  );
}

export default function EditContent() {
  const { id } = useParams();
  const article = articles.find((article) => article.id === Number(id));

  const [judul, setJudul] = useState(article ? article.title : "");
  const [deskripsi, setDeskripsi] = useState(article ? article.desc : "");
  const [thumbnail, setThumbnail] = useState(article ? article.thumbnail : "");
  const [selectedCategories, setSelectedCategories] = useState(
    article ? article.category : []
  );
  const [isFocused, setIsFocused] = useState({
    judul: false,
    deskripsi: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate()

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Article: ", {
      id,
      judul,
      deskripsi,
      thumbnail,
      selectedCategories,
    });
    toast.success("Article Updated");
    navigate("/content")
  };

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    console.log("Item deleted");
    setIsModalVisible(false);
    toast.success("Article Deleted");
    navigate("/content")
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  return (
    <section>
      <div className="p-[30px] bg-[#F9FAFB] h-[calc(100vh-80px)]">
        <form className="grid grid-cols-4 gap-5" onSubmit={handleSubmit}>
          {/* LEFT INPUT */}
          <div className="col-span-3 flex flex-col">
            <div className="bg-white px-4 py-5 rounded-t-lg shadow-md">
              <div className="relative bg-inherit">
                <input
                  type="text"
                  id="judul"
                  name="judul"
                  className="w-full peer bg-transparent h-10 rounded-lg text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
                  placeholder={isFocused.judul ? "Masukan Judul" : ""}
                  onFocus={() => handleFocus("judul")}
                  onBlur={() => handleBlur("judul")}
                  onChange={(e) => setJudul(e.target.value)}
                  value={judul}
                />
                <label
                  htmlFor="judul"
                  className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary-500 peer-focus:text-sm transition-all"
                >
                  Judul Artikel
                </label>
              </div>
            </div>
            <div className="bg-white px-4 py-5 rounded-b-lg shadow-md">
              <div className="relative bg-inherit">
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  className="w-full peer bg-transparent h-[621px] rounded-lg text-gray-700 ring-1 px-3 py-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
                  placeholder={isFocused.deskripsi ? "Masukan Deskripsi" : ""}
                  onFocus={() => handleFocus("deskripsi")}
                  onBlur={() => handleBlur("deskripsi")}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  value={deskripsi}
                  rows={10}
                />
                <label
                  htmlFor="deskripsi"
                  className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary-500 peer-focus:text-sm transition-all"
                >
                  Deskripsi
                </label>
              </div>
            </div>
            <div className="self-start mt-5 bg-transparent">
              <button
                type="button"
                className="rounded-[5px] bg-danger-500 text-white btn-l font-bold py-4 px-[22px]"
                onClick={handleDelete}
              >
                Hapus
              </button>
            </div>
          </div>
          {/* RIGHT INPUT */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-5">
              <div className="bg-white py-5 px-4 rounded-lg boxShadow">
                <div>
                  <label
                    className="block text-gray-700 body-l font-bold mb-5"
                    htmlFor="thumbnail"
                  >
                    Thumbnail
                  </label>
                  <div className="border-2 border-dashed border-gray-300 h-[203px] rounded-lg cursor-pointer flex flex-col items-center justify-center hover:border-gray-400 relative">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt="Thumbnail Preview"
                        className="rounded-md w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <AddImageIcon />
                      </div>
                    )}
                    <input
                      type="file"
                      id="thumbnail"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white py-5 px-4 rounded-lg boxShadow">
                <div>
                  <label className="block text-gray-700 body-l font-bold mb-5">
                    Kategori
                  </label>
                  <div className="grid grid-cols-2 gap-x-[30px] gap-y-5">
                    {categories.map((category) => (
                      <div key={category} className="flex gap-2 items-center">
                        <input
                          id={category}
                          name={category}
                          type="checkbox"
                          value={category}
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="relative peer shrink-0 appearance-none w-4 h-4 border-2 border-primary-500 rounded-sm bg-white mt-1 checked:bg-primary-500 checked:border-0"
                        />
                        <label className="body-m" htmlFor={category}>
                          {category}
                        </label>
                        <RxCheck className="absolute w-4 h-4 mt-1 text-white hidden peer-checked:block" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 px-5">
              <Link to={"/content"} className="flex-1">
                <button
                  type="button"
                  className="w-full rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4"
                >
                  Batal
                </button>
              </Link>
              <button
                type="submit"
                className="flex-1 rounded-[5px] bg-primary-500 text-white btn-l font-bold py-4"
                onClick={handleSubmit}
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
      <HapusModal
        isVisible={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </section>
  );
}
