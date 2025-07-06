import { useNavigate, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import TeacherAttendanceSession from "../pages/TeacherAttendanceSession";
import TeacherProfile from "../pages/TeacherProfile";
import { useAuthContext } from "../context/AuthContext";

const TeacherRoute = () => {
  const navigate = useNavigate();
  const { currentUser, authChecked } = useAuthContext();

  useEffect(() => {
    if (!authChecked) return; // Wait for auth check

    if (!currentUser || currentUser.role !== "teacher") {
      navigate("/teacher-login");
    }
  }, [currentUser, authChecked, navigate]);

  const element = useRoutes([
    {
      path: "/attendance-session",
      element: <TeacherAttendanceSession />,
    },
    {
      path: "/profile",
      element: <TeacherProfile />,
    },
  ]);

  return element;
};

export default TeacherRoute;
