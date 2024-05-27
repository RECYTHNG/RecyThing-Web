import { useState } from 'react';
import { AddCircleIcon } from '../../../assets/icons';
import Card from '../../../components/global/Card';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'antd';

const articles = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Exploring the Wonders of the Universe',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title: 'The Future of Artificial Intelligence',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Top 10 Travel Destinations in 2024',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Healthy Eating: Tips and Tricks',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title: 'The Evolution of Web Development',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Understanding Climate Change',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Innovations in Renewable Energy',
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title: 'The Rise of Electric Vehicles',
  },
  {
    id: 9,
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title:
      'A Guide to Mindfulness Meditation Test panjang banget parah nih asli coi widiwwww',
  },
  {
    id: 10,
    image:
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Advancements in Biotechnology',
  },
];

function ArticleModal({ article, isVisible, onOk, onCancel }) {
  return (
    <Modal open={isVisible} onOk={onOk} onCancel={onCancel} footer={[<Button key="submit" type="primary" onClick={onOk}>OK</Button>]}>
      {article && (
        <div>
          <h2>{article.title}</h2>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: 'auto' }} />
          <p>ID: {article.id}</p>
          {/* Add more article details here if needed */}
        </div>
      )}
    </Modal>
  );
}

function ArticlePagination({ currentPage, totalArticles, articlesPerPage, paginate }) {
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  return (
    <div className="flex justify-between items-center mt-6">
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
          Displays {Math.min(indexOfFirstArticle + 1, totalArticles)} to {Math.min(indexOfLastArticle, totalArticles)} data from a total of {totalArticles} data
        </p>
      </div>
      <div className="flex items-center gap-[10px]">
        <button className="btn-s font-semibold" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span className="btn-s border border-solid border-primary-500 rounded p-[10px]">{currentPage}</span>
        <button className="btn-s font-semibold" onClick={() => paginate(currentPage + 1)} disabled={indexOfLastArticle >= totalArticles}>
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
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[52px] gap-y-8 mt-8 place-items-center">
            {currentArticles.map((article) => (
              <Card key={article.id} image={article.image} title={article.title} onClick={() => showModal(article)} />
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
      <ArticleModal article={selectedArticle} isVisible={isModalVisible} onOk={handleOk} onCancel={handleCancel} />
    </section>
  );
}