import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
//importing APIs
import { markStudentAttendanceAPI, checkActiveSessionAPI } from "../api/student.api";
//importing context
import { useAuthContext } from "../../../context/AuthContext";

function useStudentMarkAttendance() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const [otp, setOtp] = useState("");
  const [validated, setValidated] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const res = await markStudentAttendanceAPI(otp, true, currentUser.id);
        console.log(res);
        setFeedback("Attendance marked successfully!");
      } catch (error) {
        console.log(error);
        setFeedback("Failed to mark attendance.");
      }
    }

    setValidated(true);
  };

  useEffect(() => {
    const checkActiveSession = async () => {
      try {
        const res = await checkActiveSessionAPI();
        console.log(res.status);
      } catch (error) {
        console.log(error.status);
        if (error.status === 429) {
          navigate("/");
        }
      }
    };

    checkActiveSession();
  }, []);

  return {
    otp,
    setOtp,
    validated,
    setValidated,
    feedback,
    setFeedback,
    handleSubmit,
  };
}

export default useStudentMarkAttendance;