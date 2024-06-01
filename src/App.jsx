import './App.css'
import './CustomAnt.css'
import { Routes, Route } from 'react-router-dom'
import { Dashboard, ManageAdmin, ManageContent, ManageReport, MissionList, ManageUserAchievements, ManageApprovalTask } from './pages/admin'
import Playground from './pages/Playground';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './layouts/DashboardLayout';
import AddContentArticle from './pages/admin/ManageContent/AddContentArticle';
import EditContentArticle from "./pages/admin/ManageContent/EditContentArticle";
import AddContentVideo from './pages/admin/ManageContent/AddContentVideo';
import EditContentVideo from './pages/admin/ManageContent/EditContentVideo';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/report' element={<ManageReport />} />
          <Route path='/content' element={<ManageContent/>} />
          <Route path='/content/add-article' element={<AddContentArticle/>} />
          <Route path="/content/edit-article/:id" element={<EditContentArticle />} />
          <Route path='/content/add-video' element={<AddContentVideo/>} />
          <Route path='/content/edit-video/:id' element={<EditContentVideo/>} />
          <Route path='/achievement' element={<ManageUserAchievements/>}/>
          <Route path='/mission/list' element={<MissionList />} />
          <Route path='/mission/approval' element={<ManageApprovalTask/>} />
          <Route path="/admin" element={<ManageAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
