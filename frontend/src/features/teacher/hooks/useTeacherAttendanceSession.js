import { useEffect, useState } from "react";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//importing APIs
import { getTeacherSubjectsAPI, getAttendanceOtpAPI } from "../api/teacher.api";

function useTeacherAttendanceSession() {
    const { currentUser, authChecked } = useAuthContext();
    const [selectedSubject, setSelectedSubject] = useState("");
    const [isHavingSubjects, setIsHavingSubjects] = useState(false);
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [timer, setTimer] = useState(0);
    const [showPopup, setShowPopup] = useState(true);

    const getTeacherSubjects = async () => {
        try {
            const subjects = await getTeacherSubjectsAPI(currentUser.id);
            if (subjects.length === 0) {
                setIsHavingSubjects(false);
            } else {
                setIsHavingSubjects(true);
                setAvailableSubjects(subjects);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!authChecked) return;
        getTeacherSubjects();
    }, [authChecked, currentUser]);

    const handleGetOtp = async () => {
        try {
            const res = await getAttendanceOtpAPI(selectedSubject);
            setFeedback(`OTP: ${res.data.otp}`);
            setTimer(60);
        } catch (error) {
            console.log(error);
            setFeedback("Failed to fetch OTP.");
        }
    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    return {
        selectedSubject,
        setSelectedSubject,
        isHavingSubjects,
        availableSubjects,
        feedback,
        handleGetOtp,
        timer,
        setTimer,
        showPopup,
        setShowPopup
    };
}

export default useTeacherAttendanceSession;