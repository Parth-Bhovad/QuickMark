import { useState } from "react";
import { loginStudentAPI, registerStudentAPI, studentForgotPasswordAPI } from "../api/auth.api.js";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function useAuth() {

  const navigate = useNavigate();

  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [rollNo, setRollNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const { checkAuth } = useAuthContext();

  //loading states
  const [loggingInStudent, setLoggingInStudent] = useState(false);
  const [registeringStudent, setRegisteringStudent] = useState(false);
  const [forgotingPassword, setForgotingPassword] = useState(false);

  const handleLoginStudent = async (e) => {
    try {
      setLoggingInStudent(true);
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        console.log("Form is invalid");
      } else {
        const data = await loginStudentAPI(studentEmail, studentPassword);
        console.log(data);
        checkAuth();
        if (data?.token) {
          navigate("/student/mark-attendance");
        }
      }
      setValidated(true);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.msg || error.response?.data?.error || "Login failed");
      setValidated(false);
    } finally {
      setLoggingInStudent(false);
    }
  };

  const handleRegisterStudent = async (e, otp) => {
    try {
      setRegisteringStudent(true);
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        console.log("Form is invalid");
      } else {
        const data = await registerStudentAPI(rollNo, studentName, studentEmail, studentPassword, otp);
        console.log(data);
        if (data?.token) {
          navigate("/student/mark-attendance");
        }
      }
      setValidated(true);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.msg || error.response?.data?.error || "Registration failed");
      setValidated(false);
    } finally {
      setRegisteringStudent(false);
    }
  };

  const handleForgotPassword = async (e) => {
    try {
      setForgotingPassword(true);
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        console.log("Form is invalid");
      } else {
        const data = await studentForgotPasswordAPI(studentEmail, studentPassword);
        console.log(data);
      }
      setValidated(true);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.msg || "Request failed");
    } finally {
      setForgotingPassword(false);
    }
  };

  return {
    studentEmail,
    setStudentEmail,
    studentPassword,
    setStudentPassword,
    handleLoginStudent,
    rollNo,
    setRollNo,
    studentName,
    setStudentName,
    emailVerified,
    setEmailVerified,
    handleRegisterStudent,
    validated,
    setValidated,
    handleForgotPassword,
    error,
    setError,
    loggingInStudent,
    registeringStudent,
    forgotingPassword
  };
}

export default useAuth;
