import { useState } from "react";
import { AddImageIcon } from "../../../components/global/Icons/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ContentLayout from "../../../layouts/ContentLayout";
import { FaCheck } from "react-icons/fa";
import { useFetch, usePostFormData } from "../../../hooks/useFetch";

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
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch("/categories", "categories");
  const { mutateAsync: addVideo } = usePostFormData();

  const rubbishCategories = data?.data?.waste_categories || [];
  const contentCategories = data?.data?.content_categories || [];
  
  const handleFocus = (inputId) => {
    setIsFocused((prev) => ({ ...prev, [inputId]: true }));
  };

  const handleBlur = (inputId) => {
    setIsFocused((prev) => ({ ...prev, [inputId]: false }));
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
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
    setThumbnailPreview(null);
    setSelectedCategories([]);
    setIsFocused({
      judul: false,
      deskripsi: false,
      linkVideo: false,
    });
    navigate("/admin/content");
  };

  const handleSubmit = async (e) => {
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
  
    const payload = {
      title: judul,
      description: deskripsi,
      link_video: linkVideo,
      content_categories: selectedCategories.filter(category =>
        contentCategories.some(cat => cat.name === category)
      ).map(name => ({ name })),
      waste_categories: selectedCategories.filter(category =>
        rubbishCategories.some(cat => cat.name === category)
      ).map(name => ({ name }))
    };
  
    const formData = new FormData();
    formData.append("json_data", JSON.stringify(payload));
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
  
    const toastId = toast.loading("Sedang menambahkan video...");
  
    try {
      await addVideo({ endpoint: "/videos/data", newData: formData });
      toast.update(toastId, {
        render: "Video berhasil ditambahkan!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      handleReset();
    } catch (error) {
      console.error("Error:", error);
      toast.update(toastId, {
        render: "Gagal menambahkan video.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
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
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
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
                    Kategori Sampah
                  </label>
                  <div className="grid grid-cols-2 gap-x-[30px] gap-y-5 cursor-pointer">
                    {rubbishCategories.map((category) => (
                      <div key={category.id} className="flex gap-2 items-center">
                        <div className="inline-flex items-center">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor={category.name}
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary-500 checked:bg-primary-500 checked:before:bg-primary-500 hover:before:opacity-10"
                              id={category.name}
                              value={category.name}
                              checked={selectedCategories.includes(category.name)}
                              onChange={() => handleCategoryChange(category.name)}
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <FaCheck className="h-3.5 w-3.5" />
                            </span>
                          </label>
                          <label
                            className="mt-px font-light text-gray-700 cursor-pointer select-none capitalize"
                            htmlFor={category.name}
                          >
                            {category.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white py-5 px-4 rounded-lg shadow-md">
                <div>
                  <label className="block text-gray-700 body-l font-bold mb-5">
                    Kategori Konten
                  </label>
                  <div className="grid grid-cols-2 gap-x-[30px] gap-y-5 cursor-pointer">
                    {contentCategories.map((category) => (
                      <div key={category.id} className="flex gap-2 items-center">
                        <div className="inline-flex items-center">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor={category.name}
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary-500 checked:bg-primary-500 checked:before:bg-primary-500 hover:before:opacity-10"
                              id={category.name}
                              value={category.name}
                              checked={selectedCategories.includes(category.name)}
                              onChange={() => handleCategoryChange(category.name)}
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <FaCheck className="h-3.5 w-3.5" />
                            </span>
                          </label>
                          <label
                            className="mt-px font-light text-gray-700 cursor-pointer select-none capitalize"
                            htmlFor={category.name}
                          >
                            {category.name}
                          </label>
                        </div>
                      </div>
                    ))}
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
                  Unggah
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </ContentLayout>
  );
}