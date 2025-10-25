import { useState } from "react";
//importing APIs
import { addManualAttendanceAPI } from "../api/attendance.api";

function useManualAttendance() {
  const [rollNo, setRollNo] = useState("");
  const [addingManualAttendance, setAddingManualAttendance] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e, selectedSubject) => {
    e.preventDefault();
    if (!rollNo.trim() || !selectedSubject) return;

    try {
      setAddingManualAttendance(true);
      setFeedback("");
      let res = await addManualAttendanceAPI(rollNo, selectedSubject, true);
      console.log(res);
      setFeedback("Attendance added successfully for Roll No: " + rollNo);
      setRollNo("");
    } catch (err) {
      console.error("Error adding attendance:", err);
      setFeedback("Failed to add attendance. " + (err.response.data.msg || ""));
    } finally {
      setAddingManualAttendance(false);
    }
  };

  return { rollNo, setRollNo, addingManualAttendance, handleSubmit, feedback };
}

export default useManualAttendance;
