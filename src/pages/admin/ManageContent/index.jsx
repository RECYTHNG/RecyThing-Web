import { useState } from "react";
import ManageContentVideo from "./ManageContentVideo";
import ManageContentArticle from "./ManageContentArticle";
import { Link } from "react-router-dom";
import { AddCircleIcon } from "../../../components/Icons/icons";
import ContentLayout from "../../../layouts/ContentLayout";

export default function ManageContent() {
  const [activeTab, setActiveTab] = useState("article");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ContentLayout title="Manajemen Konten">
      <section>
        <div className="bg-[#F9FAFB] flex flex-col p-5">
          <div className="flex justify-between items-center mb-5">
            <div className="flex gap-6">
              <button
                className={`btn-l py-[10px] font-semibold ${activeTab === "article" ? "text-primary-500 border-b-2 border-primary-500" : "text-black"}`}
                onClick={() => handleTabChange("article")}
              >
                Artikel
              </button>
              <button
                className={`btn-l py-[10px] font-semibold ${activeTab === "video" ? "text-primary-500 border-b-2 border-primary-500" : "text-black"}`}
                onClick={() => handleTabChange("video")}
              >
                Video
              </button>
            </div>
            <Link to={activeTab === "article" ? "/content/add-article" : "/content/add-video"}>
              <button className="btn-l font-bold px-6 py-2 bg-primary-500 text-white flex items-center gap-2 rounded-full shadow-md">
                <AddCircleIcon /> Tambah
              </button>
            </Link>
          </div>
          {activeTab === "article" ? <ManageContentArticle /> : <ManageContentVideo />}
        </div>
      </section>
    </ContentLayout>
  );
}
