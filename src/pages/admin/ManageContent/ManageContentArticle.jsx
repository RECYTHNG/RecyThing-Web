import { useState } from "react";
import Card from "../../../components/global/Card";
import { useFetch } from "../../../hooks/useFetch";
import { ArticleDetailModal } from "../../../components/Content/DetailModal";
import { Spin } from "antd";

function ArticlePagination({ currentPage, totalArticles, articlesPerPage, paginate }) {
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <label htmlFor="show" className="mr-2">Show</label>
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
          Displays {Math.min(indexOfFirstArticle + 1, totalArticles)} to {Math.min(indexOfLastArticle, totalArticles)} data from a total of {totalArticles} data
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
        <span className="btn-s border border-solid border-primary-500 rounded p-[10px]">{currentPage}</span>
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

export default function ManageContentArticle() {
  const [articlesPerPage, setArticlesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: responseData, isLoading, error } = useFetch(`/articles?page=${currentPage}&limit=${articlesPerPage}&sort_by=created_at&sort_type=desc`, 'articlesData');

  const articlesData = Array.isArray(responseData?.data?.articles) ? responseData.data.articles : [];
  const totalArticles = responseData?.data?.total || 0;

  const paginate = (pageNumber, perPage = articlesPerPage) => {
    setCurrentPage(pageNumber);
    setArticlesPerPage(perPage);
  };

  const showModal = (articleId) => {
    setSelectedArticleId(articleId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return (
      <div className="h-[698px] flex justify-center items-center">
        <Spin spinning={isLoading}/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[698px] flex justify-center items-center">
        <h5 className="h5 font-semibold">Maaf sepertinya ada kesalahan pengambilan data</h5>
      </div>
    );
  }

  return (
    <div className="px-8 py-6 shadow-md flex flex-col gap-[30px] rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[52px] gap-y-8 place-items-center">
        {articlesData.map((article) => (
          <Card
            key={article.id}
            image={article.thumbnail_url}
            title={article.title}
            onClick={() => showModal(article.id)}
          />
        ))}
      </div>
      <ArticlePagination
        currentPage={currentPage}
        totalArticles={totalArticles}
        articlesPerPage={articlesPerPage}
        paginate={paginate}
      />
      {isModalVisible && (
        <ArticleDetailModal
          articleId={selectedArticleId}
          isVisible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}