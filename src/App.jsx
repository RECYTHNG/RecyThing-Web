import "./App.css";
import "./CustomAnt.css";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Dashboard, ManageAdmin, ManageContent, ManageReport, MissionList, ManageUserAchievements, ManageApprovalTask, ManageOpenAI, LoginPage } from "./pages/admin";
import Playground from "./pages/Playground";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./layouts/DashboardLayout";
import AddContentArticle from "./pages/admin/ManageContent/AddContentArticle";
import EditContentArticle from "./pages/admin/ManageContent/EditContentArticle";
import AddContentVideo from "./pages/admin/ManageContent/AddContentVideo";
import EditContentVideo from "./pages/admin/ManageContent/EditContentVideo";
import LandingPage from "./pages/landing/LandingPage";
import NotFound from "./pages/404";
import { useEffect } from "react";
import PrivateRoute from "./Routes/PrivateRoute";
import ManageUserDetail from "./pages/admin/ManageUserDetail";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return <Outlet />;
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<ScrollToTop />}>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route element={<PrivateRoute />}> */}
            <Route element={<DashboardLayout />}>
              <Route path="/admin/*" element={<NotFound />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/report" element={<ManageReport />} />
              <Route path="/admin/content" element={<ManageContent />} />
              <Route path="/admin/content/add-article" element={<AddContentArticle />} />
              <Route path="/admin/content/edit-article/:id" element={<EditContentArticle />} />
              <Route path="/admin/content/add-video" element={<AddContentVideo />} />
              <Route path="/admin/content/edit-video/:id" element={<EditContentVideo />} />
              <Route path="/admin/achievement" element={<ManageUserAchievements />} />
              <Route path="/admin/mission/list" element={<MissionList />} />
              <Route path="/admin/mission/approval" element={<ManageApprovalTask />} />
              <Route path="/admin/admin" element={<ManageAdmin />} />
              <Route path="/admin/openai" element={<ManageOpenAI />} />
              <Route path="/admin/user" element={<ManageUserDetail />} />
            </Route>
          {/* </Route> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
