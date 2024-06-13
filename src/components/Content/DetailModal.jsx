import { Modal } from "antd";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function DetailVideoModal({ videoId, isVisible, onOk, onCancel }) {
  const { data: videoData, isLoading, error } = useFetch(
    isVisible ? `/videos/data/${videoId}` : null,
    `videoData-${videoId}`
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching video details</div>;

  const video = videoData?.data;

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
              src={video.link_video}
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
          <h2 className="h4 font-bold">{video.title}</h2>
          <p className="text-gray-500">{video.viewer} rb ditonton</p>
          <div className="h-[231px] overflow-scroll">
            <p className="text-left body-s">{video.description}</p>
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
