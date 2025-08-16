import api from "../../../axiosInstance/axios.js";

export const getAttendanceDataAPI = async (subjectName) => {
    const response = await api.get(`/attendance/${subjectName}`);
    return response;
}

export const addManualAttendanceAPI = async (rollNo, subjectName, isPresent) => {
    const response = await api.post(`/attendance/by-teacher`, {
        rollNo,
        subjectName,
        isPresent
    });
    return response;
};
