import api from "../../../axiosInstance/axios.js";

export const getAttendanceDataAPI = async (subjectName) => {
    const response = await api.get(`/attendance/${subjectName}`);
    return response;
}
