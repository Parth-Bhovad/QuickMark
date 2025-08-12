import { useState } from "react";
import { sendOTPToEmailAPI, verifyOtpAPI } from "../api/verifyEmail.api";

function useVerifyEmail() {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailVerificationError, setEmailVerificationError] = useState("");

  // Loading states
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const handleSendOTPToEmail = async (email) => {
    setEmailVerificationError("");
    setSendingOtp(true);
    try {
      const response = await sendOTPToEmailAPI(email);
      if (response.status === 200) {
        setIsOTPSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setEmailVerificationError(
        error.response?.data?.msg || error.response?.data?.error || "Failed to send OTP"
      );
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (email) => {
    setEmailVerificationError("");
    setVerifyingOtp(true);
    try {
      const response = await verifyOtpAPI(email, otp);
      if (response.status === 200) {
        setIsOTPVerified(true);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setEmailVerificationError(
        error.response?.data?.msg || error.response?.data?.error || "Failed to verify OTP"
      );
    } finally {
      setVerifyingOtp(false);
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
    sendingOtp,
    verifyingOtp
  };
}

export default useVerifyEmail;
