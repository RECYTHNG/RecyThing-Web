import { Modal } from "antd";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import dayjs from "dayjs";

export const DetailVideoModal = ({ videoId, isVisible, onOk, onCancel }) => {
  const { data: videoData, isLoading, error } = useFetch(
    isVisible ? `/videos/data/${videoId}` : null,
    `videoData-${videoId}`
  );

  const video = videoData?.data;

  const convertToEmbedLink = (link) => {
    const videoId = link.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

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
              src={convertToEmbedLink(video.link_video)}
              className="w-full h-full object-cover object-center rounded-lg"
              allowFullScreen
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
            <Link
              to={`/admin/content/edit-video/${video.id}`}
              className="flex-1"
            >
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
};

export const ArticleDetailModal = ({ articleId, isVisible, onOk, onCancel }) => {
  const { data: articleData, isLoading, error } = useFetch( isVisible ? `/article/${articleId}` : null, `articleId-${articleId}` );
  console.log(articleData)
  const article = articleData?.data;

  return (
    <Modal
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      width={571}
      footer={null}
    >
      {article && (
        <div className="pt-8">
          <div className="h-[276px] flex items-center justify-center">
            <img
              src={article.thumbnail_url}
              alt={article.title}
              className="w-full h-full object-cover object-center rounded-lg mb-4"
            />
          </div>
          <h2 className="h4 font-bold mb-2 text-start">{article.title}</h2>
          <p className="text-start text-gray-500 mb-5">
            {dayjs(article.created_at).format("DD MMMM YYYY")}
          </p>
          <div className="h-[231px] overflow-scroll pt-[18px] px-8">
            <p className="text-justify body-s">{article.description}</p>
            {article.sections &&
              article.sections.map((section, index) => (
                <div key={index} className="mt-4">
                  <h3 className="h6 font-bold">{section.title}</h3>
                  <p className="body-s">{section.description}</p>
                  {section.image_url && (
                    <img
                      src={section.image_url}
                      alt={section.title}
                      className="w-full h-full object-cover object-center rounded-lg mt-2"
                    />
                  )}
                </div>
              ))}
            {!article.sections && null}
          </div>
          <div className="flex gap-2 px-8 mt-8">
            <button
              type="reset"
              className="flex-1 rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4"
              onClick={onOk}
            >
              Kembali
            </button>
            <Link to={`/content/edit-article/${article.id}`} className="flex-1">
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
};
