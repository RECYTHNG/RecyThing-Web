import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddImageIcon } from "../../../components/global/Icons/icons";
import { FaCheck } from "react-icons/fa";
import ContentLayout from "../../../layouts/ContentLayout";
import { Modal } from "antd";
import DeleteModalChildren from "../../../components/Content/DeleteModalChild";
import { useDeleteData, useFetch, usePatchFormData } from "../../../hooks/useFetch";

export default function EditContentVideo() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    `/videos/data/${id}`,
    `videoData-${id}`
  );
  const navigate = useNavigate();

  const video = data?.data || {};

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [linkVideo, setLinkVideo] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedWasteCategories, setSelectedWasteCategories] = useState([]);
  const [isFocused, setIsFocused] = useState({
    judul: false,
    deskripsi: false,
    linkVideo: false,
  });

  const { data: categoryData } = useFetch("/categories", "categories");
  const rubbishCategories = categoryData?.data?.waste_categories || [];
  const contentCategories = categoryData?.data?.content_categories || [];

  const { mutateAsync: patchVideo } = usePatchFormData();
  const { mutateAsync: deleteVideo } = useDeleteData();

  useEffect(() => {
    if (video) {
      setJudul(video.title || "");
      setDeskripsi(video.description || "");
      setLinkVideo(video.link_video || "");
      setThumbnail(video.url_thumbnail || null);
      setSelectedCategories(
        video.content_categories?.map((category) => category.name) || []
      );
      setSelectedWasteCategories(
        video.waste_categories?.map((category) => category.name) || []
      );
    }
  }, [video]);

  const handleFocus = (inputId) => {
    setIsFocused((prev) => ({ ...prev, [inputId]: true }));
  };

  const handleBlur = (inputId) => {
    setIsFocused((prev) => ({ ...prev, [inputId]: false }));
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleCategoryChange = (category, isWasteCategory = false) => {
    if (isWasteCategory) {
      setSelectedWasteCategories((prev) =>
        prev.includes(category)
          ? prev.filter((item) => item !== category)
          : [...prev, category]
      );
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((item) => item !== category)
          : [...prev, category]
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !judul ||
      !deskripsi ||
      !linkVideo ||
      (!thumbnail && !thumbnailFile) ||
      selectedCategories.length === 0 ||
      selectedWasteCategories.length === 0
    ) {
      toast.error("Semua field harus diisi!");
      return;
    }
  
    const jsonData = {
      title: judul,
      description: deskripsi,
      link_video: linkVideo,
      content_categories: selectedCategories.map((name) => ({ name })),
      waste_categories: selectedWasteCategories.map((name) => ({ name })),
    };
  
    const formData = new FormData();
    formData.append("json_data", JSON.stringify(jsonData));
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }
  
    const toastId = toast.loading("Sedang memperbarui video...");
  
    try {
      await patchVideo(
        { endpoint: `/videos/data/${id}`, updatedData: formData },
        {
          onSuccess: () => {
            toast.update(toastId, {
              render: "Video berhasil diperbarui!",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            navigate("/admin/content");
          }
        }
      );
    } catch (error) {
      toast.update(toastId, {
        render: "Gagal memperbarui video",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    const toastId = toast.loading("Sedang menghapus video...");
  
    deleteVideo(
      { endpoint: `/videos/data/${video.id}` },
      {
        onSuccess: () => {
          toast.update(toastId, {
            render: "Video berhasil dihapus!",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          navigate("/admin/content");
        },
        onError: () => {
          toast.update(toastId, {
            render: "Gagal menghapus video.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
      }
    );
  };
  
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  return (
    <ContentLayout title={"Edit Video"}>
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
                    className="w-full peer bg-transparent h-[568px] rounded-lg text-gray-700 ring-1 px-3 py-3 ring-gray-300 focus:ring-primary-500 focus:outline-none focus:border-rose-600"
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
                    placeholder={
                      isFocused.linkVideo ? "Masukan Link Video" : ""
                    }
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
                      Kategori Sampah
                    </label>
                    <div className="grid grid-cols-2 gap-x-[30px] gap-y-5 cursor-pointer">
                      {rubbishCategories.map((category) => (
                        <div
                          key={category.id}
                          className="flex gap-2 items-center"
                        >
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
                                checked={selectedWasteCategories.includes(
                                  category.name
                                )}
                                onChange={() =>
                                  handleCategoryChange(category.name, true)
                                }
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
                        <div
                          key={category.id}
                          className="flex gap-2 items-center"
                        >
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
                                checked={selectedCategories.includes(
                                  category.name
                                )}
                                onChange={() =>
                                  handleCategoryChange(category.name)
                                }
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
              </div>
              <div className="flex gap-2 px-5 pt-5">
                <Link to={"/admin/content"} className="flex-1">                
                  <button
                    type="reset"
                    className="w-full rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4"
                  >
                    Batal
                  </button>
                </Link>
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
      <Modal
        open={isModalVisible}
        footer={null}
      >
        <DeleteModalChildren onOk={handleConfirmDelete} onCancel={handleCancelDelete} type="video"/>
      </Modal>
    </ContentLayout>
  );
}