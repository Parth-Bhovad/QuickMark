import api from '../../../axiosInstance/axios.js';

export const getStudentsAPI = async (page) => {
    const response = await api.get('/students', { params: { page } });
    return response.data;
};