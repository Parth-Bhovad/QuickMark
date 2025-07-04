import InputField from "../../../components/InputField";
//importing custom hooks 
import useAuth from "../hooks/useAuth";
import useVerifyEmail from "../../../hooks/useVerifyEmail.js";

function TeacherSignup() {
    const {
        teacherName,
        setTeacherName,
        teacherEmail,
        setTeacherEmail,
        teacherPassword,
        setTeacherPassword,
        handleRegisterTeacher
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
            <h1>Teacher Signup Page</h1>
            <form>
                <InputField
                    label={"Teacher Name:"}
                    id={"name"}
                    name={"teacherName"}
                    required={true}
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)} />
                <InputField
                    label={"Teacher Email:"}
                    id={"email"}
                    name={"teacherEmail"}
                    required={true}
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)} />

                <button type="button" onClick={() => handleSendOTPToEmail(teacherEmail)}>Verify Email</button>
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
                            <button onClick={() => handleVerifyOtp(teacherEmail)}>Verify OTP</button>
                        </div>
                    )
                }
                <InputField
                    label={"Teacher Password:"}
                    id={"password"}
                    name={"teacherPassword"}
                    required={true}
                    type={"password"}
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)} />
                <button type="submit" disabled={!isOTPVerified} onClick={handleRegisterTeacher}>Sign Up</button>
            </form>
        </>
    );
}

export default TeacherSignup;