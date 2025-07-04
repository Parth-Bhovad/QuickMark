import api from "../../../axiosInstance/axios.js";

export const loginTeacherAPI = async (teacherEmail, teacherPassword) => {
    const response = await api.post("/teachers/login", {
        teacherEmail,
        teacherPassword
    });
    return response;
}

export const registerTeacherAPI = async (teacherEmail, teacherPassword, teacherName) => {
    const response = await api.post("/teachers", {
        teacherEmail,
        teacherPassword,
        teacherName
    });
    return response;
}