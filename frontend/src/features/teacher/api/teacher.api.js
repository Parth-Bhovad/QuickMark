import api from "../../../axiosInstance/axios.js";

export const getTeacherSubjectsAPI = async (teacherId) => {
    const response = await api.get(`/teachers/${teacherId}/subjects`);
    return response.data.subjects;
}

export const getAttendanceOtpAPI = async (subjectName) => {
    const response = await api.get("/attendance/otp", { params: { subjectName } });
    return response;
}

export const addSubjectAPI = async (teacherId, subjectName) => {
    const response = await api.patch(`/teachers/${teacherId}/subjects`, { subjectName });
    return response.data;
}

export const getTeacherProfileAPI = async (teacherId) => {
    const response = await api.get(`/teachers/${teacherId}`);
    return response.data;
}