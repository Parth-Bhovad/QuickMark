import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
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

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginStudentAPI(email, password),
    onSuccess: (data) => {
      checkAuth();
      if (data?.token) {
        navigate("/student/mark-attendance");
      }
    },
    onError: (error) => {
      setError(error.response?.data?.msg || error.response?.data?.error || "Login failed");
      setValidated(false);
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ rollNumber, name, email, password }) => registerStudentAPI(rollNumber, name, email, password),
    onSuccess: (data) => {
      checkAuth();
      if (data?.token) {
        navigate("/student/mark-attendance");
      }
    },
    onError: (error) => {
      setError(error.response?.data?.msg || error.response?.data?.error || "Registration failed");
      setValidated(false);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: ({ email, password }) => studentForgotPasswordAPI(email, password),
    onSuccess: () => navigate("/student-login"),
    onError: (error) => {
      setError(error.response?.data?.msg || "Request failed");
    },
  });

  const handleLoginStudent = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;

    setError("");
    loginMutation.mutate({ email: studentEmail, password: studentPassword });
  };

  const handleRegisterStudent = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;

    setError("");
    registerMutation.mutate({
      rollNumber: rollNo,
      name: studentName,
      email: studentEmail,
      password: studentPassword,
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;

    setError("");
    forgotPasswordMutation.mutate({ email: studentEmail, password: studentPassword });
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
    loggingInStudent: loginMutation.isPending,
    registeringStudent: registerMutation.isPending,
    forgotingPassword: forgotPasswordMutation.isPending
  };
}

export default useAuth;
