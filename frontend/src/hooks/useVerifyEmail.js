import { useState } from "react";
//importing APIs
import {sendOTPToEmailAPI, verifyOtpAPI} from "../api/verifyEmail.api";

function useVerifyEmail() {
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [isOTPVerified, setIsOTPVerified] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSendOTPToEmail = async (email) => {
        const response = await sendOTPToEmailAPI(email);
        console.log(response);
        
        if (response.status === 200) {
            setIsOTPSent(true);
        }
    };

    const handleVerifyOtp = async (email) => {
        const response = await verifyOtpAPI(email, otp);
        console.log(response);

        if (response.status === 200) {
            setIsOTPVerified(true);
        }
    };

    return {
        isOTPSent,
        isOTPVerified,
        otp,
        setOtp,
        handleSendOTPToEmail,
        handleVerifyOtp
    };
}

export default useVerifyEmail;