import api from "../../../axiosInstance/axios.js";

export const markStudentAttendanceAPI = async (otp, isPresent, studentId) => {
    const response = await api.post("attendance/", {
        otp,
        isPresent,
        studentId
    });
    return response.data;
}

export const checkActiveSessionAPI = async () => {
    const response = await api.get("attendance/check-active-session");
    return response;
}