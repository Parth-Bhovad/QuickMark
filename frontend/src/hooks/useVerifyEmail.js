import { useState } from "react";
//importing APIs
import { sendOTPToEmailAPI, verifyOtpAPI } from "../api/verifyEmail.api";

function useVerifyEmail() {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailVerificationError, setEmailVerificationError] = useState("");

  const handleSendOTPToEmail = async (email) => {
    try {
      const response = await sendOTPToEmailAPI(email);
      console.log(response);

      if (response.status === 200) {
        setIsOTPSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setEmailVerificationError(
        error.response.data.msg || error.response.data.error
      );
    }
  };

  const handleVerifyOtp = async (email) => {
    try {
      const response = await verifyOtpAPI(email, otp);
      console.log(response);

      if (response.status === 200) {
        setIsOTPVerified(true);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setEmailVerificationError(
        error.response.data.msg || error.response.data.error
      );
    }
  };

  return {
    isOTPSent,
    isOTPVerified,
    otp,
    setOtp,
    handleSendOTPToEmail,
    handleVerifyOtp,
    emailVerificationError,
  };
}

export default useVerifyEmail;
