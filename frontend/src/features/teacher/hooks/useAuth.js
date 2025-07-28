import { useState } from "react";
//importing APIs
import { loginTeacherAPI, registerTeacherAPI, teacherForgotPasswordAPI } from "../api/auth.api";

function useAuth() {
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [validated, setValidated] = useState(false);

    const handleLoginTeacher = async (e) => {
        try {
            const form = e.currentTarget;
            e.preventDefault();
            if (form.checkValidity() === false) {
                console.log("Form is invalid");
            } else {
                const response = await loginTeacherAPI(teacherEmail, teacherPassword);
                console.log(response);
            }
            setValidated(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegisterTeacher = async (e, otp) => {
        try {
            e.preventDefault();
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                console.log("Form is invalid");
            } else {
                const response = await registerTeacherAPI(teacherEmail, teacherPassword, teacherName, otp);
                console.log(response);
            }
            setValidated(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleForgotPassword = async (e) => {
            try {
                e.preventDefault();
                const form = e.currentTarget;
                if (form.checkValidity() === false) {
                    console.log("Form is invalid");
                } else {
                    // Call API to send OTP
                    const data = await teacherForgotPasswordAPI(teacherEmail, teacherPassword);
                    console.log(data);
                }
                setValidated(true);
            } catch (error) {
                console.log(error);
            }
        }

    return ({
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
        handleForgotPassword
    });
}

export default useAuth;