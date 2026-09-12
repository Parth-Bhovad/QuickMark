import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
//importing APIs
import { addManualAttendanceAPI } from "../api/attendance.api";

function useManualAttendance() {
  const [rollNo, setRollNo] = useState("");
  const [feedback, setFeedback] = useState("");

  const attendanceMutation = useMutation({
    mutationFn: ({ rollNumber, subject }) => addManualAttendanceAPI(rollNumber, subject, true),
    onSuccess: (_, { rollNumber }) => {
      setFeedback("Attendance added successfully for Roll No: " + rollNumber);
      setRollNo("");
    },
    onError: (error) => {
      setFeedback("Failed to add attendance. " + (error.response?.data?.msg || ""));
    },
  });

  const handleSubmit = (e, selectedSubject) => {
    e.preventDefault();
    setFeedback("");
    attendanceMutation.mutate({ rollNumber: rollNo, subject: selectedSubject });
  };

  return {
    rollNo,
    setRollNo,
    addingManualAttendance: attendanceMutation.isPending,
    handleSubmit,
    feedback,
  };
}

export default useManualAttendance;
