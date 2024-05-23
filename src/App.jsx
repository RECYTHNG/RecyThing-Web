import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Dashboard, ManageReport } from './pages/admin'
import Playground from './pages/Playground';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/report' element={<ManageReport />} />
        <Route path='/playground' element={<Playground />} />
      </Routes>
    </div>
  )
}

export default App
