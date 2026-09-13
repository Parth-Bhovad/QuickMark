import { useEffect, useState } from "react";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
//importing auth context
import { useAuthContext } from "../../../context/AuthContext";
//importing APIs
import { getTeacherSubjectsAPI, getAttendanceOtpAPI } from "../api/teacher.api";

function useTeacherAttendanceSession() {
    const { currentUser, authChecked } = useAuthContext();
    const [selectedSubject, setSelectedSubject] = useState("");
    const [feedback, setFeedback] = useState("");
    const [timer, setTimer] = useState(0);
    const [showPopup, setShowPopup] = useState(true);

    const subjectsQuery = useQuery(queryOptions({
        queryKey: ["teacherSubjects", currentUser?.id],
        queryFn: () => getTeacherSubjectsAPI(currentUser.id),
        enabled: authChecked && Boolean(currentUser?.id),
    }));

    const otpMutation = useMutation({
        mutationFn: () => getAttendanceOtpAPI(selectedSubject),
        onSuccess: (response) => {
            setFeedback(`OTP: ${response.data.otp}`);
            setTimer(30);
        },
        onError: (error) => {
            setFeedback("Failed to fetch OTP: " + (error.response?.data?.msg || error.message));
        },
    });

    const handleGetOtp = () => {
        setFeedback("");
        otpMutation.mutate();
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
        isHavingSubjects: subjectsQuery.data?.length > 0,
        availableSubjects: subjectsQuery.data || [],
        feedback,
        handleGetOtp,
        timer,
        setTimer,
        showPopup,
        setShowPopup,
        gettingOtp: otpMutation.isPending,
    };
}

export default useTeacherAttendanceSession;