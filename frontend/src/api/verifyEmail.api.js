import axiosInstance from "../axiosInstance/axios";

export const sendOTPToEmailAPI = async (email) => {
        const response = await axiosInstance.post("/authenticate/send-otp", { email });
        return response;
}

export const verifyOtpAPI = async (email, otp) => {
    const response = await axiosInstance.post("/authenticate/verify-otp", { email, otp });
    return response;
}