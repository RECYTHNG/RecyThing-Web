import { useState } from "react";
import { AddImageIcon } from "../../../components/Icons/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ContentLayout from "../../../layouts/ContentLayout";
import { FaCheck } from "react-icons/fa";

export default function AddContentVideo() {
  const [isFocused, setIsFocused] = useState({
    judul: false,
    deskripsi: false,
    linkVideo: false,
  });
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [linkVideo, setLinkVideo] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const categories = [
    "Tips",
    "Daur Ulang",
    "Tutorial",
    "Edukasi",
    "Kampanye",
    "Lainnya",
  ];

  const handleFocus = (inputId) => {
    setIsFocused((prev) => ({ ...prev, [inputId]: true }));
  };

  const handleBlur = (inputId) => {
    setIsFocused((prev) => ({ ...prev, [inputId]: false }));
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.some((item) => item === category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleReset = () => {
    setJudul("");
    setDeskripsi("");
    setLinkVideo("");
    setThumbnail(null);
    setSelectedCategories([]);
    setIsFocused({
      judul: false,
      deskripsi: false,
      linkVideo: false,
    });
    navigate("/content");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !judul ||
      !deskripsi ||
      !linkVideo ||
      !thumbnail ||
      selectedCategories.length === 0
    ) {
      toast.error("Semua field harus diisi!");
      return;
    }
    const formData = {
      judul,
      deskripsi,
      linkVideo,
      thumbnail,
      categories: selectedCategories,
    };
    console.log("Video Submitted: ", formData);
    toast.success("Video berhasil diunggah");
    navigate("/content");
  };

  return (
    <ContentLayout title={"Tambah Video"}>
      <section>
        <div className="p-[30px] bg-[#F9FAFB] h-auto">
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
                    Judul Video
                  </label>
                </div>
              </div>
              <div className="bg-white px-4 shadow-md">
                <div className="relative bg-inherit">
                  <textarea
                    id="deskripsi"
                    name="deskripsi"
                    className="w-full peer bg-transparent h-[641px] rounded-lg text-gray-700 ring-1 px-3 py-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
                    placeholder={isFocused.deskripsi ? "Masukan Deskripsi" : ""}
                    onFocus={() => handleFocus("deskripsi")}
                    onBlur={() => handleBlur("deskripsi")}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    value={deskripsi}
                  />
                  <label
                    htmlFor="deskripsi"
                    className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary-500 peer-focus:text-sm transition-all"
                  >
                    Deskripsi
                  </label>
                </div>
              </div>
              <div className="bg-white px-4 py-5 rounded-b-lg shadow-md">
                <div className="relative bg-inherit">
                  <input
                    type="text"
                    id="linkVideo"
                    name="linkVideo"
                    className="w-full peer bg-transparent h-10 rounded-lg text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
                    placeholder={isFocused.linkVideo ? "Masukan Link Video" : ""}
                    onFocus={() => handleFocus("linkVideo")}
                    onBlur={() => handleBlur("linkVideo")}
                    onChange={(e) => setLinkVideo(e.target.value)}
                    value={linkVideo}
                  />
                  <label
                    htmlFor="linkVideo"
                    className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary-500 peer-focus:text-sm transition-all"
                  >
                    Link Video
                  </label>
                </div>
              </div>
            </div>
            {/* RIGHT INPUT */}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-5">
                <div className="bg-white py-5 px-4 rounded-lg shadow-md">
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
                <div className="bg-white py-5 px-4 rounded-lg shadow-md">
                  <div>
                    <label className="block text-gray-700 body-l font-bold mb-5">
                      Kategori
                    </label>
                    <div className="grid grid-cols-2 gap-x-[30px] gap-y-5 cursor-pointer">
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
                          <label
                            className="body-m cursor-pointer"
                            htmlFor={category}
                          >
                            {category}
                          </label>
                          <FaCheck className="absolute w-4 h-4 text-white hidden peer-checked:block" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-5">
                <button
                  type="reset"
                  className="flex-1 rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4"
                  onClick={handleReset}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-[5px] bg-primary-500 text-white btn-l font-bold py-4"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </ContentLayout>
  );
}