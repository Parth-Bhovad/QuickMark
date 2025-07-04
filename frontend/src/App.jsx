import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import StudentLoginPage from './features/student/pages/StudentLoginPage'
import StudentSignupPage from './features/student/pages/StudentSignupPage'
import TeacherLoginPage from './features/teacher/pages/TeacherLoginPage'
import TeacherSignupPage from './features/teacher/pages/TeacherSignupPage'
import AttendancePage from './pages/AttendancePage'
import AttendanceList from './pages/AttendanceList'
import TeacherAttendanceSession from './pages/TeacherAttendanceSession'
import StudentMarkAttendance from './pages/StudentMarkAttendance'
import TeacherProfile from './pages/TeacherProfile'
import StudentProfile from './pages/StudentProfile'
import { BrowserRouter, Routes, Route } from "react-router";
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<StudentLoginPage />} />
        <Route path="/signup" element={<StudentSignupPage />} />
        <Route path="/teacher-login" element={<TeacherLoginPage />} />
        <Route path="/teacher-signup" element={<TeacherSignupPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
        <Route path="/teacher-attendance-session" element={<TeacherAttendanceSession />} />
        <Route path="/student-mark-attendance" element={<StudentMarkAttendance />} />
        <Route path="/teacher-profile" element={<TeacherProfile />} />
        <Route path="/student-profile" element={<StudentProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;