import { useState } from "react";
import { loginStudentAPI, registerStudentAPI, studentForgotPasswordAPI } from "../api/auth.api.js";

function useAuth() {
    const [studentEmail, setStudentEmail] = useState("");
    const [studentPassword, setStudentPassword] = useState("");
    const [rollNo, setRollNo] = useState('');
    const [studentName, setStudentName] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [otp, setOtp] = useState('');
    const [validated, setValidated] = useState(false);

    const handleLoginStudent = async (e) => {
        try {
            e.preventDefault();
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                console.log("Form is invalid");
            } else {
                const data = await loginStudentAPI(studentEmail, studentPassword);
                console.log(data);
            }
            setValidated(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegisterStudent = async (e) => {
        try {
            e.preventDefault();
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                console.log("Form is invalid");
            } else {
                const data = await registerStudentAPI(rollNo, studentName, studentEmail, studentPassword);
                console.log(data);
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
                const data = await studentForgotPasswordAPI(studentEmail, studentPassword);
                console.log(data);
            }
            setValidated(true);
        } catch (error) {
            console.log(error);
        }
    }

    return ({
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
        otp,
        setOtp,
        handleRegisterStudent,
        validated,
        setValidated,
        handleForgotPassword
    });
}

export default useAuth;