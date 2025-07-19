import api from "../axiosInstance/axios";

export const getAvailableSubjectsAPI = async (studentId) => {
    const response = await api.get(`/subjects/`);
    return response.data;
}