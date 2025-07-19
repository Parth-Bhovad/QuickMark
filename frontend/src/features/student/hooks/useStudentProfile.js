import { useEffect, useState } from "react";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//importing APIs
import { getStudentProfileAPI, addSubjectToStudentAPI } from "../api/student.api.js";
import { getAvailableSubjectsAPI } from "../../../api/getAvailableSubjects.api.js";

function useStudentProfile() {
    const { currentUser, authChecked } = useAuthContext();

    const [subjectName, setSubjectName] = useState("");
    const [availableSubjects, setAvailableSubjects] = useState([]);
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
        if (!subjects.includes(subjectName)) {
            console.log(`Subject already added: ${subjectName}`);

            setError("Subject already added.");
            return;
        }
        try {
            await addSubjectToStudentAPI(currentUser.id, subjectName);
            setSubjects((prevSubjects) => [...prevSubjects, subjectName]);
            setSubjectName("");
        } catch (error) {
            console.error("Failed to add subject:", error);
            setError("Failed to add subject:", error);
        }
    };

    const getStudentProfile = async () => {
        try {
            const response = await getStudentProfileAPI(currentUser.id);

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

    const getAvailableSubjects = async () => {
        try {
            const response = await getAvailableSubjectsAPI(currentUser.id);
            setAvailableSubjects(response.availableSubjects || []);
        } catch (error) {
            console.error("Failed to fetch available subjects:", error);
            setError("Failed to fetch available subjects:", error);
        }
    };

    useEffect(() => {
        if (!authChecked) return;
        getStudentProfile();
        getAvailableSubjects();
    }, [authChecked, currentUser]);

    return {
        studentName,
        setStudentName,
        availableSubjects,
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