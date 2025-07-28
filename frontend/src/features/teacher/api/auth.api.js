import api from "../../../axiosInstance/axios.js";

export const loginTeacherAPI = async (teacherEmail, teacherPassword) => {
    const response = await api.post("/teachers/login", {
        teacherEmail,
        teacherPassword
    });
    return response;
}

export const registerTeacherAPI = async (teacherEmail, teacherPassword, teacherName, otp) => {
    const response = await api.post("/teachers", {
        teacherEmail,
        teacherPassword,
        teacherName,
        otp
    });
    return response;
}

export const teacherForgotPasswordAPI = async (teacherEmail, newPassword) => {
    const response = await api.patch("/teachers/forgot-password", {
        teacherEmail,
        newPassword,
    });
    return response.data;
}