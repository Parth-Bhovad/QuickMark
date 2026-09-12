import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
//importing APIs
import {
  loginTeacherAPI,
  registerTeacherAPI,
  teacherForgotPasswordAPI,
} from "../api/auth.api";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const { checkAuth } = useAuthContext();
  const navigate = useNavigate();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginTeacherAPI(email, password),
    onSuccess: (response) => {
      checkAuth();
      if (response.data.token) {
        navigate("/teacher/attendance-session");
      }
    },
    onError: (error) => {
      setError(error.response?.data?.msg || error.response?.data?.error || "Login failed");
      setValidated(true);
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password, name }) => registerTeacherAPI(email, password, name),
    onSuccess: (response) => {
      checkAuth();
      if (response.data.token) {
        navigate("/teacher/attendance-session");
      }
    },
    onError: (error) => {
      setError(error.response?.data?.msg || error.response?.data?.error || "Registration failed");
      setValidated(false);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: ({ email, password }) => teacherForgotPasswordAPI(email, password),
    onSuccess: () => navigate("/teacher-login"),
    onError: (error) => {
      setError(error.response?.data?.msg || error.response?.data?.error || "Request failed");
    },
  });

  const handleLoginTeacher = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;

    setError("");
    loginMutation.mutate({ email: teacherEmail, password: teacherPassword });
  };

  const handleRegisterTeacher = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;

    setError("");
    registerMutation.mutate({ email: teacherEmail, password: teacherPassword, name: teacherName });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;

    setError("");
    forgotPasswordMutation.mutate({ email: teacherEmail, password: teacherPassword });
  };

  return {
    teacherEmail,
    setTeacherEmail,
    teacherPassword,
    setTeacherPassword,
    teacherName,
    setTeacherName,
    handleLoginTeacher,
    handleRegisterTeacher,
    validated,
    setValidated,
    handleForgotPassword,
    error,
    setError,
    loggingInTeacher: loginMutation.isPending,
    registeringTeacher: registerMutation.isPending,
    forgettingPassword: forgotPasswordMutation.isPending,
  };
}

export default useAuth;
