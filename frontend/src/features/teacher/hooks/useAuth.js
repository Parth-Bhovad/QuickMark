import { useState } from "react";
//importing APIs
import { loginTeacherAPI, registerTeacherAPI } from "../api/auth.api";

function useAuth() {
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");
    const [teacherName, setTeacherName] = useState("");

    const handleLoginTeacher = async (e) => {
        try {
            e.preventDefault();
            const response = await loginTeacherAPI(teacherEmail, teacherPassword);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegisterTeacher = async (e) => {
        try {
            e.preventDefault();
            const response = await registerTeacherAPI(teacherEmail, teacherPassword, teacherName);
            console.log(response);
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
        handleRegisterTeacher
    });
}

export default useAuth;