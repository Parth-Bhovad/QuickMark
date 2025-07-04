import { useState } from "react";
import { loginStudentAPI, registerStudentAPI } from "../api/auth.api.js";

function useAuth() {
    const [studentEmail, setStudentEmail] = useState("");
    const [studentPassword, setStudentPassword] = useState("");
    const [rollNo, setRollNo] = useState('');
    const [studentName, setStudentName] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [otp, setOtp] = useState('');

    const handleLoginStudent = async (e) => {
        try {
            e.preventDefault();
            const data = await loginStudentAPI(studentEmail, studentPassword);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegisterStudent = async (e) => {
        try {
            e.preventDefault();
            const data = await registerStudentAPI(rollNo, studentName, studentEmail, studentPassword);
            console.log(data);
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
        handleRegisterStudent
    });
}

export default useAuth;