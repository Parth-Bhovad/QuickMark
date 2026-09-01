import './App.css'
import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import StudentLoginPage from './features/student/pages/StudentLoginPage'
import StudentForgotPasswordPage from './features/student/pages/StudentForgotPasswordPage'
import StudentSignupPage from './features/student/pages/StudentSignupPage'
import TeacherLoginPage from './features/teacher/pages/TeacherLoginPage'
import TeacherForgotPasswordPage from './features/teacher/pages/TeacherForgotPasswordPage'
import TeacherSignupPage from './features/teacher/pages/TeacherSignupPage'
import AttendancePage from './pages/AttendancePage'
import { Routes, Route } from "react-router";
import StudentRoute from './routes/StudentRoute';
import TeacherRoute from './routes/TeacherRoute';
import Demo from './ReactQueryDemo'


function App() {
  useEffect(() => {
    const checkSplit = () => {
      const blocker = document.getElementById("splitScreenBlocker");
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w <= 300 || h <= 600) {
        blocker.style.display = "flex";
      } else {
        blocker.style.display = "none";
      }
    };

    checkSplit();
    window.addEventListener("resize", checkSplit);
    return () => window.removeEventListener("resize", checkSplit);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-login" element={<StudentLoginPage />} />
        <Route path="/student-forgot-password" element={<StudentForgotPasswordPage />} />
        <Route path="/student-signup" element={<StudentSignupPage />} />
        <Route path="/teacher-login" element={<TeacherLoginPage />} />
        <Route path="/teacher-forgot-password" element={<TeacherForgotPasswordPage />} />
        <Route path="/teacher-signup" element={<TeacherSignupPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/student/*" element={<StudentRoute />} />
        <Route path="/teacher/*" element={<TeacherRoute />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
      {/* Split-screen blocker overlay */}
      <div id="splitScreenBlocker" className="split-blocker">
        <p>Please expand your view to full screen to mark attendance.</p>
      </div>
    </>
  );
}

export default App;