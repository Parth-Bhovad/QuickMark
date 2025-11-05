import { useEffect, useState } from "react";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//Student Context
import { useStudentContext } from "../context/StudentContext";
//importing APIs
import { getStudentProfileAPI } from "../api/student.api.js";

function useStudentProfileDetails() {
    const { currentUser, authChecked } = useAuthContext();
    const { enrolledSubjects, setEnrolledSubjects } = useStudentContext();

    const [studentName, setStudentName] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!authChecked) return;
        const getStudentProfile = async () => {
            try {
                const response = await getStudentProfileAPI(currentUser.id);

                setStudentName(response.studentName);
                setRollNo(response.rollNo);
                if (response.subjects.length !== 0) {
                    setEnrolledSubjects(response.subjects);
                }
            } catch (error) {
                console.error("Failed to fetch student profile:", error);
                setError("Failed to fetch student profile:", error);
            }
        }
        getStudentProfile();
    }, [currentUser, authChecked, setEnrolledSubjects]);

    return { studentName, enrolledSubjects, rollNo, error };
}

export default useStudentProfileDetails;