import { useEffect, useState } from "react";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//importing APIs
import { getStudentProfileAPI, addSubjectToStudentAPI } from "../api/student.api.js";

function useStudentProfile() {
    const { currentUser, authChecked } = useAuthContext();

    const [subjectName, setSubjectName] = useState("");
    const [studentName, setStudentName] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [subjects, setSubjects] = useState(["No subjects available"]);
    const [rollNo, setRollNo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddSubject = async () => {
        if (!subjectName.trim()) {
            setError("Subject name cannot be empty.");
            return;
        }
        try {
            await addSubjectToStudentAPI(currentUser.id, subjectName);
            setSubjects([subjectName]);
            setSubjectName("");
        } catch (error) {
            console.error("Failed to add subject:", error);
            setError("Failed to add subject:", error);
        }
    };

    const getStudentProfile = async () => {
        try {
            const response = await getStudentProfileAPI(currentUser.id);
            console.log(response);
            console.log(response.studentName);

            setStudentName(response.studentName);
            setRollNo(response.rollNo);
            if (response.subjects.length !== 0) {
                setSubjects(response.subjects);
            }
        } catch (error) {
            console.error("Failed to fetch student profile:", error);
            setError("Failed to fetch student profile:", error);
        }
    }

    useEffect(() => {
        if (!authChecked) return;
        getStudentProfile();
    }, [authChecked, currentUser]);

    return {
        studentName,
        setStudentName,
        showInput,
        setShowInput,
        subjects,
        subjectName,
        setSubjectName,
        rollNo,
        loading,
        setLoading,
        error,
        handleAddSubject
    };
}

export default useStudentProfile;