import { useState } from "react";
import Card from "../../../components/global/Card";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { videos } from "./dummyData.json";

function VideoModal({ video, isVisible, onOk, onCancel }) {
  return (
    <Modal
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      width={571}
      footer={null}
    >
      {video && (
        <div className="pt-6 flex flex-col gap-5">
          <div className="h-[300px] w-full flex items-center justify-start">
            <iframe
              src={video.linkVideo}
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
          <h2 className="h4 font-bold">{video.title}</h2>
          <p className="text-gray-500">{video.watch} rb ditonton</p>
          <div className="h-[231px] overflow-scroll">
            <p className="text-left body-s">{video.desc}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="reset"
              className="flex-1 rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4"
              onClick={onOk}
            >
              Kembali
            </button>
            <Link to={`/content/edit-video/${video.id}`} className="flex-1">
              <button
                type="submit"
                className="w-full rounded-[5px] bg-primary-500 text-white btn-l font-bold py-4"
              >
                Ubah
              </button>
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
}

function VideoPagination({
  currentPage,
  totalVideos,
  videosPerPage,
  paginate,
}) {
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <label htmlFor="show" className="mr-2">
          Show
        </label>
        <select
          id="show"
          className="rounded-lg border px-1 py-1"
          onChange={(e) => paginate(1, Number(e.target.value))}
          value={videosPerPage}
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
        <p className="body-m font-normal text-[#9B9B9B]">
          Displays {Math.min(indexOfFirstVideo + 1, totalVideos)} to{" "}
          {Math.min(indexOfLastVideo, totalVideos)} data from a total of{" "}
          {totalVideos} data
        </p>
      </div>
      <div className="flex items-center gap-[10px]">
        <button
          className="btn-s font-semibold"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="btn-s border border-solid border-primary-500 rounded p-[10px]">
          {currentPage}
        </span>
        <button
          className="btn-s font-semibold"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastVideo >= totalVideos}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function ManageContent() {
  const [videosPerPage, setVideosPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber, perPage = videosPerPage) => {
    setCurrentPage(pageNumber);
    setVideosPerPage(perPage);
  };

  const showModal = (video) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="px-8 py-6 shadow-md flex flex-col gap-[30px] rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[52px] gap-y-8 place-items-center">
        {currentVideos.map((video) => (
          <Card
            key={video.id}
            image={video.thumbnail}
            title={video.title}
            onClick={() => showModal(video)}
          />
        ))}
      </div>
      <VideoPagination
        currentPage={currentPage}
        totalVideos={videos.length}
        videosPerPage={videosPerPage}
        paginate={paginate}
      />
      <VideoModal
        video={selectedVideo}
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
}