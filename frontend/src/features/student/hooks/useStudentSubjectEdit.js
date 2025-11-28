import { useEffect, useState } from "react";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//Student Context
import { useStudentContext } from "../context/StudentContext";
//importing APIs
import { editStudentSubjectAPI } from "../api/student.api.js";
import { getAvailableSubjectsAPI } from "../../../api/getAvailableSubjects.api.js";

function useStudentSubjectEdit() {
    const { enrolledSubjects, setEnrolledSubjects } = useStudentContext();
    const { currentUser, authChecked } = useAuthContext();


    const [availableSubjects, setAvailableSubjects] = useState([]);
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

    const onSubjectChange = (subject) => {
        setEnrolledSubjects((prevSelected) => {
            return prevSelected.includes(subject)
                ? prevSelected.filter((sub) => sub !== subject)
                : [...prevSelected, subject];
        });
    };

    useEffect(() => {
        if (!authChecked) return;
        const getAvailableSubjects = async () => {
            try {
                console.log("Fetching available subjects...");
                const response = await getAvailableSubjectsAPI(currentUser.id);
                setAvailableSubjects(response.availableSubjects);
            } catch (error) {
                console.error("Failed to fetch available subjects:", error.response.data.msg);
                setError(error.response.data.msg);
            }
        };
        getAvailableSubjects();
    }, [authChecked, currentUser]);
    return ({
        availableSubjects,
        enrolledSubjects,
        setEnrolledSubjects,
        handleAddSubject,
        onSubjectChange,
        addingSubject,
        error
    });
}

export default useStudentSubjectEdit;