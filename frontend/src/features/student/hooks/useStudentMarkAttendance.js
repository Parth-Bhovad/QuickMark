import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//importing APIs
import { markStudentAttendanceAPI, checkActiveSessionAPI, deleteStudentAtendanceAPI } from "../api/student.api";
//importing context
import { useAuthContext } from "../../../context/AuthContext";

function useStudentMarkAttendance() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const currentUserRef = useRef(currentUser);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
  const isAttendanceMarkedRef = useRef(false);

  //loading state for submitting attendance
  const [submittingAttendance, setSubmittingAttendance] = useState(false);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  useEffect(() => {
    isAttendanceMarkedRef.current = isAttendanceMarked;
  }, [isAttendanceMarked]);

  const [otp, setOtp] = useState("");
  const otpRef = useRef(otp);
  useEffect(() => {
    otpRef.current = otp;
  }, [otp]);
  const [validated, setValidated] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    setSubmittingAttendance(true);
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const res = await markStudentAttendanceAPI(otp, true, currentUser.id);
        console.log(res);
        setFeedback("Attendance marked successfully!");
        setIsAttendanceMarked(true);
      } catch (error) {
        console.log(error);
        setFeedback("Failed to mark attendance: " + (error.response.data.message || "Unknown error"));
      } finally {
        setSubmittingAttendance(false);
      }
    }

    setValidated(true);
  };

  const handleVisibilityChange = async () => {
    console.log("Visibility Event Listener added");

    if (document.visibilityState === "hidden") {
      const user = currentUserRef.current;
      const otp = otpRef.current;
      const isAttendanceMarked = isAttendanceMarkedRef.current;
      
      if (isAttendanceMarked) {
        await deleteStudentAtendanceAPI(user.id, new Date().toISOString().split("T")[0], otp);
      }
      navigate("/");
    }
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
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Cleanup function to remove the event listener
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        console.log("Visibility change listener removed");
        
      };
    }, []);

    return {
      otp,
      setOtp,
      validated,
      setValidated,
      feedback,
      setFeedback,
      handleSubmit,
      submittingAttendance
    };
  }

  export default useStudentMarkAttendance;