import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AttendancePage from './pages/AttendancePage'
import AttendanceList from './pages/AttendanceList'
import { BrowserRouter, Routes, Route } from "react-router";
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;