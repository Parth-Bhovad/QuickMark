import api from "../axiosInstance/axios.js";

export const logoutUserAPI = async () => {
    const response = await api.post("authenticate/logout");
    return response.data;
}