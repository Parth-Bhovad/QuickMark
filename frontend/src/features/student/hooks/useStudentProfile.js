import { useEffect, useState } from "react";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//importing APIs
import { getStudentProfileAPI, editStudentSubjectAPI } from "../api/student.api.js";
import { getAvailableSubjectsAPI } from "../../../api/getAvailableSubjects.api.js";

function useStudentProfile() {
    const { currentUser, authChecked } = useAuthContext();

    // const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [rollNo, setRollNo] = useState("");
    const [error, setError] = useState("");
    //Adding loading state
    const [addingSubject, setAddingSubject] = useState(false);
    const handleAddSubject = async () => {
        setAddingSubject(true);
        try {
            await editStudentSubjectAPI(currentUser.id, enrolledSubjects);
            console.log(enrolledSubjects);
        } catch (error) {
            console.error("Failed to add subject:", error);
            setError("Failed to add subject:", error);
        } finally {
            setAddingSubject(false);
        }
    };

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

    const onSubjectChange = (subject) => {
        setEnrolledSubjects((prevSelected) => {
            return prevSelected.includes(subject)
                ? prevSelected.filter((sub) => sub !== subject)
                : [...prevSelected, subject];
        });
    };

    return {
        studentName,
        setStudentName,
        availableSubjects,
        showInput,
        setShowInput,
        enrolledSubjects,
        onSubjectChange,
        rollNo,
        error,
        handleAddSubject,
        addingSubject
    };
}

export default useStudentProfile;