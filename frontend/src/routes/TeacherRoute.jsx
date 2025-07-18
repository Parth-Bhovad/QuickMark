import { useNavigate, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import TeacherAttendanceSessionPage from "../features/teacher/pages/TeacherAttendanceSessionPage";
import TeacherProfilePage from "../features/teacher/pages/TeacherProfilePage";
import { useAuthContext } from "../context/AuthContext";

const TeacherRoute = () => {
  const navigate = useNavigate();
  const { currentUser, authChecked } = useAuthContext();
  useEffect(() => {
    if (!authChecked){ 
      return; 
    }
    if (!currentUser || currentUser.role !== "teacher") {
      navigate("/teacher-login");
    }
  }, [currentUser, authChecked, navigate]);

  const element = useRoutes([
    {
      path: "/attendance-session",
      element: <TeacherAttendanceSessionPage />,
    },
    {
      path: "/profile",
      element: <TeacherProfilePage />,
    },
  ]);

  return element;
};

export default TeacherRoute;
