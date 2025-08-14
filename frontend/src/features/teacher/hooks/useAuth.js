import { useState } from "react";
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

  //loading state
  const [loggingInTeacher, setLoggingInTeacher] = useState(false);
  const [registeringTeacher, setRegisteringTeacher] = useState(false);
  const [forgettingPassword, setForgettingPassword] = useState(false);

  const handleLoginTeacher = async (e) => {
    try {
      setLoggingInTeacher(true);
      const form = e.currentTarget;
      e.preventDefault();
      if (form.checkValidity() === false) {
        console.log("Form is invalid");
      } else {
        const response = await loginTeacherAPI(teacherEmail, teacherPassword);
        console.log(response);
        checkAuth();
        if (response.data.token) {
          navigate("/teacher/attendance-session");
        }
      }
      setValidated(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg || error.response.data.error);
      setValidated(true);
    } finally {
      setLoggingInTeacher(false);
    }
  };

  const handleRegisterTeacher = async (e, otp) => {
    try {
      setRegisteringTeacher(true);
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        console.log("Form is invalid");
      } else {
        const response = await registerTeacherAPI(
          teacherEmail,
          teacherPassword,
          teacherName,
          otp
        );
        console.log(response);
        checkAuth();
        if (response?.data?.token) {
          navigate("/teacher/attendance-session");
        }
      }
      setValidated(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg || error.response.data.error);
      setValidated(false);
    } finally {
      setRegisteringTeacher(false);
    }
  };

  const handleForgotPassword = async (e) => {
    try {
      setForgettingPassword(true);
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        console.log("Form is invalid");
      } else {
        // Call API to send OTP
        const data = await teacherForgotPasswordAPI(
          teacherEmail,
          teacherPassword
        );
        console.log(data);
      }
      setValidated(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg || error.response.data.error);
    } finally {
      setForgettingPassword(false);
    }
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
    loggingInTeacher,
    registeringTeacher,
    forgettingPassword,
  };
}

export default useAuth;
