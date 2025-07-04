import api from "../../../axiosInstance/axios.js";

export const loginStudentAPI = async (studentEmail, studentPassword) => {
    const response = await api.post("students/login", {
        studentEmail,
        studentPassword
    });
    return response.data;
}

export const registerStudentAPI = async (rollNo, studentName, studentEmail, studentPassword) => {
    const response = await api.post("students/", {
        rollNo,
        studentName,
        studentEmail,
        studentPassword,
    });
    return response.data;
}