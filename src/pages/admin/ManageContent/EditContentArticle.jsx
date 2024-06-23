import { useState, useEffect } from "react";
import {
  AddCircleIcon,
  AddImageIcon,
} from "../../../components/global/Icons/icons";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import ContentLayout from "../../../layouts/ContentLayout";
import { FaCheck } from "react-icons/fa";
import {
  useDeleteData,
  useFetch,
  usePostFormData,
  useUpdateData,
} from "../../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import DeleteModalChildren from "../../../components/Content/DeleteModalChild";

export default function EditContentArticle() {
  const { id } = useParams();
  const { data: articleData, error } = useFetch(`/article/${id}`);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [subJuduls, setSubJuduls] = useState([
    { subJudul: "", deskripsi: "", image: null, imagePreview: null },
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFocused, setIsFocused] = useState({});

  const { data } = useFetch("/categories", "categories");

  const navigate = useNavigate();

  const rubbishCategories = data?.data?.waste_categories || [];
  const contentCategories = data?.data?.content_categories || [];

  const { mutateAsync: deleteArticle } = useDeleteData();
  const { mutateAsync: updateDataImage } = usePostFormData();
  const { mutateAsync: updateData } = useUpdateData();

  useEffect(() => {
    if (articleData && articleData.code === 200) {
      const data = articleData.data;
      setJudul(data.title);
      setDeskripsi(data.description);
      setThumbnailPreview(data.thumbnail_url);
      setSubJuduls(
        data.sections.map((section) => ({
          subJudul: section.title,
          deskripsi: section.description,
          image: null,
          imagePreview: section.image_url,
        }))
      );
      setSelectedCategories([
        ...data.waste_categories.map((cat) => cat.name),
        ...data.content_categories.map((cat) => cat.name),
      ]);
    } else if (error) {
      toast.error("Failed to fetch article data");
    }
  }, [articleData, error]);

  const handleFocus = (field) => setIsFocused({ ...isFocused, [field]: true });
  const handleBlur = (field) => setIsFocused({ ...isFocused, [field]: false });

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubJudulChange = (index, field, value) => {
    const updatedSubJuduls = [...subJuduls];
    updatedSubJuduls[index][field] = value;
    setSubJuduls(updatedSubJuduls);
  };

  const handleSubJudulImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedSubJuduls = [...subJuduls];
    updatedSubJuduls[index].image = file;
    updatedSubJuduls[index].imagePreview = URL.createObjectURL(file);
    setSubJuduls(updatedSubJuduls);
  };

  const addSubJudul = () => {
    setSubJuduls([
      ...subJuduls,
      { subJudul: "", deskripsi: "", imagePreview: "" },
    ]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let thumbnailUrl = thumbnailPreview;
    let sectionImageUrls = [
      ...subJuduls.map((section) => section.imagePreview),
    ];
    const toastUploadImage = toast.loading("Mengunggah gambar...");

    if (thumbnail instanceof File) {
      try {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append("image", thumbnail);
        const thumbnailResponse = await updateDataImage({
          endpoint: "/article/upload",
          newData: thumbnailFormData,
        });

        toast.update(toastUploadImage, {
          render: "Thumbnail berhasil diunggah!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        thumbnailUrl = thumbnailResponse.data.image_url;
      } catch (error) {
        toast.update(toastUploadImage, {
          render: "Gagal mengunggah thumbnail.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        return;
      }
    }

    for (let i = 0; i < subJuduls.length; i++) {
      if (subJuduls[i].image instanceof File) {
        try {
          const sectionFormData = new FormData();
          sectionFormData.append("image", subJuduls[i].image);
          const sectionImageResponse = await updateDataImage({
            endpoint: "/article/upload",
            newData: sectionFormData,
          });

          toast.update(toastUploadImage, {
            render: `Gambar untuk section ${i + 1} berhasil diunggah!`,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });

          sectionImageUrls[i] = sectionImageResponse.data.image_url;
        } catch (error) {
          toast.update(toastUploadImage, {
            render: `Gagal mengunggah gambar untuk sub judul ${i + 1}.`,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return;
        }
      }
    }

    const payload = {
      title: judul,
      description: deskripsi,
      thumbnail_url: thumbnailUrl,
      waste_categories: selectedCategories.filter((category) =>
        rubbishCategories.some((rubbish) => rubbish.name === category)
      ),
      content_categories: selectedCategories.filter((category) =>
        contentCategories.some((content) => content.name === category)
      ),
      sections: subJuduls.map((section, index) => ({
        title: section.subJudul,
        description: section.deskripsi,
        image_url: sectionImageUrls[index],
      })),
    };

    try {
      const response = await updateData({
        endpoint: `/article/${id}`,
        updatedData: payload,
      });

      toast.success("Artikel berhasil diedit!");
      navigate("/admin/content")
    } catch (error) {
      toast.error("Gagal mengedit artikel");
    }
  };

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    const toastId = toast.loading("Sedang menghapus artikel...");

    deleteArticle(
      { endpoint: `/article/${articleData.data.id}` },
      {
        onSuccess: () => {
          toast.update(toastId, {
            render: "Artikel berhasil dihapus!",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          navigate("/admin/content");
        },
        onError: () => {
          toast.update(toastId, {
            render: "Gagal menghapus artikel.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        },
      }
    );
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  return (
    <ContentLayout title={"Edit Artikel"}>
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
                            className="rounded-md h-full w-full object-cover"
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
      <Modal open={isModalVisible} footer={null}>
        <DeleteModalChildren
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          type="artikel"
        />
      </Modal>
    </ContentLayout>
  );
}
