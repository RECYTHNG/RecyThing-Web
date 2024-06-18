import { useState } from "react";
import {
  AddCircleIcon,
  AddImageIcon,
} from "../../../components/global/Icons/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ContentLayout from "../../../layouts/ContentLayout";
import { FaCheck } from "react-icons/fa";
import { useFetch, usePostData, usePostFormData } from "../../../hooks/useFetch";

export default function AddContentArticle() {
  const [isFocused, setIsFocused] = useState({
    judul: false,
    deskripsi: false,
  });
  const [judul, setJudul] = useState("");
  const [subJuduls, setSubJuduls] = useState([
    { subJudul: "", deskripsi: "", image: null, imagePreview: null },
  ]);
  const [deskripsi, setDeskripsi] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const { mutateAsync: addArticleImage } = usePostFormData();
  const { mutateAsync: addArticleJson } = usePostData();
  const { data, isLoading, error } = useFetch("/categories", "categories");

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
      setThumbnail(e.target.files[0]);
      setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubJudulImageChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const newSubJuduls = [...subJuduls];
      newSubJuduls[index].image = e.target.files[0];
      newSubJuduls[index].imagePreview = URL.createObjectURL(e.target.files[0]);
      setSubJuduls(newSubJuduls);
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
    setSubJuduls([{ subJudul: "", deskripsi: "", image: null }]);
    setDeskripsi("");
    setThumbnail(null);
    setSelectedCategories([]);
    setIsFocused({
      judul: false,
      deskripsi: false,
    });
    navigate("/admin/content");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!judul || !deskripsi || !thumbnail || selectedCategories.length === 0) {
      toast.error("Semua field harus diisi!");
      return;
    }

    const toastUploadImage = toast.loading("Mengunggah gambar...");
    const toastUploadJson = toast.loading("Mengunggah artikel...");
    
    try {
      const thumbnailFormData = new FormData();
      thumbnailFormData.append("image", thumbnail);
      const thumbnailResponse = await addArticleImage({
        endpoint: "/article/upload",
        newData: thumbnailFormData,
      });
  

      if (thumbnailResponse.code !== 200) {
        toast.update(toastUploadImage, {
          render: thumbnailResponse.message || "Gagal mengunggah thumbnail.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        return;
      }
      
      toast.update(toastUploadImage, {
        render: "Thumbnail berhasil diunggah!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      const thumbnailUrl = thumbnailResponse.data.image_url;
  
      const sectionImageUrls = [];
      for (let i = 0; i < subJuduls.length; i++) {
        if (subJuduls[i].image) {
          const sectionFormData = new FormData();
          sectionFormData.append("image", subJuduls[i].image);
          const sectionImageResponse = await addArticleImage({
            endpoint: "/article/upload",
            newData: sectionFormData,
          });
  
          if (sectionImageResponse.code !== 200) {
            toast.update(toastUploadImage, {
              render: sectionImageResponse.message || `Gagal mengunggah gambar untuk sub judul ${i + 1}.`,
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
            return;
          }
  
          toast.update(toastUploadImage, {
            render: `Gambar untuk section ${i + 1} berhasil diunggah!`,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          sectionImageUrls[i] = sectionImageResponse.data.image_url;
        } else {
          sectionImageUrls[i] = null;
        }
      }
  
      const jsonData = {
        title: judul,
        description: deskripsi,
        thumbnail_url: thumbnailUrl,
        waste_categories: selectedCategories
          .filter((category) =>
            rubbishCategories.some((cat) => cat.name === category)
          ),
        content_categories: selectedCategories
          .filter((category) =>
            contentCategories.some((cat) => cat.name === category)
          ),
        sections: subJuduls.map((subJudul, index) => ({
          title: subJudul.subJudul,
          description: subJudul.deskripsi,
          image_url: sectionImageUrls[index],
        })),
      };
  
      await addArticleJson({
        endpoint: "/article",
        newData: jsonData,
      });

      toast.update(toastUploadJson, {
        render: "Artikel berhasil ditambahkan!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      handleReset();
      navigate("/admin/content");

    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal Menambahkan Artikel")
    }
  };
  

  const handleSubJudulChange = (index, key, value) => {
    const newSubJuduls = [...subJuduls];
    newSubJuduls[index][key] = value;
    setSubJuduls(newSubJuduls);
  };

  const addSubJudul = () => {
    setSubJuduls([...subJuduls, { subJudul: "", deskripsi: "", image: null }]);
  };

  return (
    <ContentLayout title={"Tambah Artikel"}>
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
                    Judul Artikel
                  </label>
                </div>
              </div>
              <div className="bg-white px-4 shadow-md">
                <div className="relative bg-inherit">
                  <textarea
                    id="deskripsi"
                    name="deskripsi"
                    className="w-full peer bg-transparent h-[118px] rounded-lg text-gray-700 ring-1 px-3 py-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
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
              <p className="body-m text-primary-500 font-semibold bg-white px-4 pt-4 shadow-md">
                Bagian (Opsional)
              </p>
              {subJuduls.map((subJudul, index) => (
                <div
                  key={index}
                  className="flex gap-[10px] w-full bg-white shadow-md"
                >
                  <p className="font-bold pl-4 pt-5">{index + 1}.</p>
                  <div className="flex flex-col w-full">
                    <div className="bg-white px-4 py-5 w-full">
                      <div className="relative bg-inherit">
                        <input
                          type="text"
                          id={`subJudul-${index}`}
                          name={`subJudul-${index}`}
                          className="w-full peer bg-transparent h-10 rounded-lg text-gray-700 ring-1 px-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
                          placeholder={
                            isFocused[`subJudul-${index}`]
                              ? "Masukan Sub Judul"
                              : ""
                          }
                          onFocus={() => handleFocus(`subJudul-${index}`)}
                          onBlur={() => handleBlur(`subJudul-${index}`)}
                          onChange={(e) =>
                            handleSubJudulChange(
                              index,
                              "subJudul",
                              e.target.value
                            )
                          }
                          value={subJudul.subJudul}
                        />
                        <label
                          htmlFor={`subJudul-${index}`}
                          className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary-500 peer-focus:text-sm transition-all"
                        >
                          Sub Judul Artikel
                        </label>
                      </div>
                    </div>
                    <div className="bg-white px-4">
                      <div className="relative bg-inherit">
                        <textarea
                          id={`deskripsi-${index}`}
                          name={`deskripsi-${index}`}
                          className="w-full peer bg-transparent h-[118px] rounded-lg text-gray-700 ring-1 px-3 py-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600 mt-2"
                          placeholder={
                            isFocused[`deskripsi-${index}`]
                              ? "Masukan Deskripsi"
                              : ""
                          }
                          onFocus={() => handleFocus(`deskripsi-${index}`)}
                          onBlur={() => handleBlur(`deskripsi-${index}`)}
                          onChange={(e) =>
                            handleSubJudulChange(
                              index,
                              "deskripsi",
                              e.target.value
                            )
                          }
                          value={subJudul.deskripsi}
                          rows={5}
                        />
                        <label
                          htmlFor={`deskripsi-${index}`}
                          className="absolute cursor-text left-2 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary-500 peer-focus:text-sm transition-all"
                        >
                          Deskripsi
                        </label>
                      </div>
                    </div>
                    <div className="px-4 py-5 self-start">
                      <div className="border-2 border-dashed border-gray-300 h-[203px] w-[306px] rounded-lg cursor-pointer flex flex-col items-center justify-center hover:border-gray-400 relative">
                        {subJudul.imagePreview ? (
                          <img
                            src={subJudul.imagePreview}
                            alt={`Sub Judul ${index + 1} Image Preview`}
                            className="rounded-md  h-full object-cover"
                          />
                        ) : (
                          <div className="text-center text-gray-500">
                            <AddImageIcon />
                          </div>
                        )}
                        <input
                          type="file"
                          id={`subJudulImage-${index}`}
                          name={`subJudulImage-${index}`}
                          accept="image/*"
                          onChange={(e) => handleSubJudulImageChange(index, e)}
                          className="opacity-0 absolute inset-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-white px-4 pb-5 w-full rounded-b-lg shadow-md">
                <button
                  type="button"
                  className="btn-l py-3 px-[22px] rounded-[5px] w-full text-start bg-primary-500 text-white font-bold inline-flex items-center gap-2"
                  onClick={addSubJudul}
                >
                  <AddCircleIcon />
                  Tambah Bagian
                </button>
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
