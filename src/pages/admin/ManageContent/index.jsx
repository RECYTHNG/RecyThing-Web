import { useState } from "react";
import { AddCircleIcon } from "../../../assets/icons";
import Card from "../../../components/global/Card";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import articles from "./articles.json"

function ArticleModal({ article, isVisible, onOk, onCancel }) {
  return (
    <Modal
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      width={571}
      footer={null}
    >
      {article && (
        <div className="pt-6">
          <h2 className="h4 font-bold text-center mb-2">{article.title}</h2>
          <p className="text-center text-gray-500 mb-4">{article.createdAt}</p>
          <div className="h-[238px] flex items-center justify-center px-[54px]">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover object-center rounded-lg mb-4"
            />
          </div>
          <div className="h-[231px] overflow-scroll pt-[18px] px-8">
            <p className="text-justify body-s">
              {article.desc}
            </p>
          </div>
          <div className="flex gap-2 px-8 mt-8">
            <button
              type="reset"
              className="flex-1 rounded-[5px] bg-transparent border border-primary-500 btn-l font-bold py-4"
              onClick={onOk}
            >
              Kembali
            </button>
            <Link to={`/content/edit/${article.id}`} className="flex-1">
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

function ArticlePagination({
  currentPage,
  totalArticles,
  articlesPerPage,
  paginate,
}) {
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

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
          value={articlesPerPage}
        >
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
        <p className="body-m font-normal text-[#9B9B9B]">
          Displays {Math.min(indexOfFirstArticle + 1, totalArticles)} to{" "}
          {Math.min(indexOfLastArticle, totalArticles)} data from a total of{" "}
          {totalArticles} data
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
          disabled={indexOfLastArticle >= totalArticles}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function ManageContent() {
  const [articlesPerPage, setArticlesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber, perPage = articlesPerPage) => {
    setCurrentPage(pageNumber);
    setArticlesPerPage(perPage);
  };

  const showModal = (article) => {
    setSelectedArticle(article);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section>
      <div className="p-5 bg-[#F9FAFB]">
        <div className="px-8 py-6 shadow-md flex flex-col gap-[30px] rounded-lg bg-white">
          <div className="flex justify-between items-center">
            <h5 className="h5 font-bold">Daftar Artikel</h5>
            <Link to="/content/add">
              <button className="btn-l font-bold px-[22px] py-2 bg-primary-500 text-white flex items-center gap-2 rounded-[20px] shadow-t-md">
                <AddCircleIcon /> Tambah
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[52px] gap-y-8 place-items-center">
            {currentArticles.map((article) => (
              <Card
                key={article.id}
                image={article.thumbnail}
                title={article.title}
                onClick={() => showModal(article)}
              />
            ))}
          </div>
          <ArticlePagination
            currentPage={currentPage}
            totalArticles={articles.length}
            articlesPerPage={articlesPerPage}
            paginate={paginate}
          />
        </div>
      </div>
      <ArticleModal
        article={selectedArticle}
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </section>
  );
}
