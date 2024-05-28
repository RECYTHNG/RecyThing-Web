import './App.css';
import './CustomAnt.css';
import { Routes, Route } from 'react-router-dom';
import { Dashboard, ManageAdmin, ManageContent, ManageReport } from './pages/admin';
import Playground from './pages/Playground';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './layouts/DashboardLayout';
import AddContent from './pages/admin/ManageContent/AddContent';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<ManageReport />} />
          <Route path="/content" element={<ManageContent />} />
          <Route path="/content/add" element={<AddContent />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/admin" element={<ManageAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
