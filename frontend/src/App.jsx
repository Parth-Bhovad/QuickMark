import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import StudentLogin from './pages/StudentLogin'
import StudentSignup from './pages/StudentSignup'
import TeacherLogin from './pages/TeacherLogin'
import TeacherSignup from './pages/TeacherSignup'
import AttendancePage from './pages/AttendancePage'
import AttendanceList from './pages/AttendanceList'
import TeacherAttendanceSession from './pages/TeacherAttendanceSession'
import StudentMarkAttendance from './pages/StudentMarkAttendance'
import { BrowserRouter, Routes, Route } from "react-router";
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
        <Route path="/teacher-attendance-session" element={<TeacherAttendanceSession />} />
        <Route path="/student-mark-attendance" element={<StudentMarkAttendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;