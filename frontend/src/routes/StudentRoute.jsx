import { useNavigate, useRoutes } from "react-router-dom";
//importing necessary components
import StudentMarkAttendance from "../pages/StudentMarkAttendance";
import StudentProfile from "../pages/StudentProfile";
//importing auth context
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const StudentRoute = () => {
    const navigate = useNavigate();

    const { currentUser, authChecked } = useAuthContext();
    useEffect(() => {
        // Wait for authentication check to complete
        if (!authChecked) return;
        // Redirect to login if not authenticated
        if (!currentUser || currentUser.role !== "student") {
            navigate("/student-login");
        }
    }, [currentUser, authChecked]);

    const element = useRoutes([
        {
            path: "/mark-attendance",
            element: <StudentMarkAttendance />,
        },
        {
            path: "/profile",
            element: <StudentProfile />,
        },
    ]);

    return element;
};

export default StudentRoute;