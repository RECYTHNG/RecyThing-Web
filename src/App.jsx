import './App.css'
import './CustomAnt.css'
import { Routes, Route } from 'react-router-dom'
import { Dashboard, ManageReport } from './pages/admin'
import Playground from './pages/Playground';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/report' element={<ManageReport />} />
          <Route path='/playground' element={<Playground />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
