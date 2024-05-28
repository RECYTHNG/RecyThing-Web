import './App.css'
import './CustomAnt.css'
import { Routes, Route } from 'react-router-dom'
import { Dashboard, ManageAdmin, ManageContent, ManageReport, MissionList } from './pages/admin'
import Playground from './pages/Playground';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './layouts/DashboardLayout';
import AddContent from './pages/admin/ManageContent/AddContent';
import EditContent from "./pages/admin/ManageContent/EditContent";
import ManageUserAchivements from './pages/admin/ManageUserAchievements';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/report' element={<ManageReport />} />
          <Route path='/content' element={<ManageContent/>} />
          <Route path='/content/add' element={<AddContent/>} />
          <Route path="/content/edit/:id" element={<EditContent />} />
          <Route path='/achievement' element={<ManageUserAchivements/>}/>
          <Route path='/mission/list' element={<MissionList />} />
          <Route path='/mission/approval' element={<MissionList />} />
          <Route path="/admin" element={<ManageAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
