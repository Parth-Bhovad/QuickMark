import { useEffect, useState } from "react";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//importing APIs
import { addSubjectAPI, getTeacherProfileAPI, removeSubjectAPI } from "../api/teacher.api";

function useTeacherProfile() {
    const { currentUser, authChecked } = useAuthContext();

    const [teacherName, setTeacherName] = useState("");
    const [subjects, setSubjects] = useState(["No subjects available"]);
    const [showInput, setShowInput] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!subjectName.trim()) {
            setError("Subject name cannot be empty.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await addSubjectAPI(currentUser.id, subjectName);
            if(subjects[0] == "No subjects available"){
                setSubjects([]);
            }
            setSubjects((prevSubjects) => [...prevSubjects, subjectName]);
            setSubjectName("");
            setShowInput(false);
        } catch (err) {
            setError("Failed to add subject.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveSubject = async () => {
        if (!subjectName.trim()) {
            setError("Subject name cannot be empty.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            await removeSubjectAPI(currentUser.id, subjectName);
            setSubjects((prevSubjects) => prevSubjects.filter((sub) => sub !== subjectName));
            setSubjectName("");
        } catch (err) {
            console.log(err);
            setError("Failed to remove subject.");
        } finally {
            setLoading(false);
        }
    };

    const getTeacherProfile = async () => {
        try {
            const response = await getTeacherProfileAPI(currentUser.id);
            setTeacherName(response.teacherName);
            if (response.subjects.length !== 0) {
                setSubjects(response.subjects);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!authChecked) return;
        getTeacherProfile();
    }, [authChecked, currentUser]);

    return ({
        teacherName,
        subjects,
        showInput,
        setShowInput,
        subjectName,
        setSubjectName,
        handleSubmit,
        handleRemoveSubject,
        loading,
        error
    });
}

export default useTeacherProfile;