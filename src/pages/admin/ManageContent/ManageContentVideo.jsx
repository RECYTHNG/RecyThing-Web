import { useState } from "react";
import Card from "../../../components/global/Card";
import { useFetch } from "../../../hooks/useFetch";
import DetailVideoModal from "../../../components/Content/DetailModal";

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
        <label htmlFor="show" className="mr-2">Show</label>
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
  const { data: responseData, isLoading, error } = useFetch('/videos/data', 'videosData');
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(8);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

  const paginate = (pageNumber, perPage = videosPerPage) => {
    setCurrentPage(pageNumber);
    setVideosPerPage(perPage);
  };

  const showModal = (videoId) => {
    setSelectedVideoId(videoId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const videosData = responseData?.data || [];

  return (
    <div className="px-8 py-6 shadow-md flex flex-col gap-[30px] rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[52px] gap-y-8 place-items-center">
        {videosData.slice(indexOfFirstVideo, indexOfLastVideo).map((video) => (
          <Card
            key={video.id}
            image={video.url_thumbnail}
            title={video.title}
            onClick={() => showModal(video.id)}
          />
        ))}
      </div>
      <VideoPagination
        currentPage={currentPage}
        totalVideos={videosData.length}
        videosPerPage={videosPerPage}
        paginate={paginate}
      />
      <DetailVideoModal
        videoId={selectedVideoId}
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
}
