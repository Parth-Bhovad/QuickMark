import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import StudentLoginPage from './features/student/pages/StudentLoginPage'
import StudentSignupPage from './features/student/pages/StudentSignupPage'
import TeacherLoginPage from './features/teacher/pages/TeacherLoginPage'
import TeacherSignupPage from './features/teacher/pages/TeacherSignupPage'
import AttendancePage from './pages/AttendancePage'
import AttendanceList from './pages/AttendanceList'
import { Routes, Route } from "react-router";
import StudentRoute from './routes/StudentRoute';
import TeacherRoute from './routes/TeacherRoute';
function App() {

  return (
        <>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
          <Route path="/student-signup" element={<StudentSignupPage />} />
          <Route path="/teacher-login" element={<TeacherLoginPage />} />
          <Route path="/teacher-signup" element={<TeacherSignupPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/attendance-list" element={<AttendanceList />} />
          <Route path="/student/*" element={<StudentRoute />} />
          <Route path="/teacher/*" element={<TeacherRoute />} />
        </Routes>
      </>
  );
}

export default App;