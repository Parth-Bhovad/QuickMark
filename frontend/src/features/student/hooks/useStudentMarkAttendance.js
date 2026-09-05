import { useMutation, useQuery, queryOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { markStudentAttendanceAPI, checkActiveSessionAPI, deleteStudentAtendanceAPI } from "../api/student.api";
import { useAuthContext } from "../../../context/AuthContext";
import { useState, useEffect } from "react";

function useStudentMarkAttendance() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const [otp, setOtp] = useState("");
  const [validated, setValidated] = useState(false);
  const [feedback, setFeedback] = useState("");

  const markAttendanceMutation = useMutation({
    mutationFn: () => markStudentAttendanceAPI(otp, true, currentUser.id),
    onSuccess: () => {
      setFeedback("Attendance marked successfully!");
      setValidated(true);
    },
    onError: (error) => {
      setFeedback("Failed to mark attendance: " + (error.response?.data?.message || "Unknown error"));
      setValidated(true);
    },
  });

  const checkActiveSessionOptions = queryOptions({
    queryKey: ["activeSession"],
    queryFn: checkActiveSessionAPI,
    onError: (error) => {
      if (error.status === 429) {
        navigate("/");
      }
    },
  })
  
  useQuery(checkActiveSessionOptions);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "hidden") {
        if (markAttendanceMutation.isSuccess) {
          await deleteStudentAtendanceAPI(
            currentUser.id,
            new Date().toISOString().split("T")[0],
            otp
          );
        }
        navigate("/");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [navigate, markAttendanceMutation.isSuccess, currentUser.id, otp]);

  return {
    otp,
    setOtp,
    validated,
    feedback,
    submittingAttendance: markAttendanceMutation.isPending,
    handleSubmit: (event) => {
      event.preventDefault();
      markAttendanceMutation.mutate();
    },
  };
}

export default useStudentMarkAttendance;