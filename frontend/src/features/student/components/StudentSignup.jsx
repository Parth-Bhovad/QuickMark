import InputField from "../../../components/InputField";
//importing custom hooks
import useAuth from "../hooks/useAuth";
import useVerifyEmail from "../../../hooks/useVerifyEmail.js";

function StudentSignup() {
    const {
        rollNo,
        setRollNo,
        studentName,
        setStudentName,
        studentEmail,
        setStudentEmail,
        studentPassword,
        setStudentPassword,
        handleRegisterStudent
    } = useAuth();

    const {
        isOTPSent,
        isOTPVerified,
        otp,
        setOtp,
        handleSendOTPToEmail,
        handleVerifyOtp
    } = useVerifyEmail();

    return (
        <>
            <form>
                <InputField
                    label={"Roll Number:"}
                    id={"rollNo"}
                    name={"rollNo"}
                    required={true}
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)} />
                <InputField
                    label={"Student Name:"}
                    id={"studentName"}
                    name={"studentName"}
                    required={true}
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)} />
                <InputField
                    label={"Password:"}
                    id={"studentPassword"}
                    name={"studentPassword"}
                    required={true}
                    type={"password"}
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)} />
                <InputField
                    label={"Email:"}
                    id={"studentEmail"}
                    name={"studentEmail"}
                    required={true}
                    type={"email"}
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                />
                <button type="button" onClick={() => handleSendOTPToEmail(studentEmail)}>Verify Email</button>
                {
                    isOTPSent && (
                        <div>
                            <label htmlFor="otp">OTP:</label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button onClick={() => handleVerifyOtp(studentEmail)}>Verify OTP</button>
                        </div>
                    )
                }
                <button type="submit" disabled={!isOTPVerified} onClick={handleRegisterStudent}>Sign Up</button>
            </form>
        </>
    );
}

export default StudentSignup;