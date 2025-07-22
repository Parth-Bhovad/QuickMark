import { Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import useVerifyEmail from "../../../hooks/useVerifyEmail";
import isValidEmail from "../../../utils/isValidEmail";

function TeacherForgotPassword() {
    const {
        teacherEmail,
        setTeacherEmail,
        teacherPassword,
        setTeacherPassword,
        validated,
        handleForgotPassword
    } = useAuth();

    const {
        isOTPSent,
        isOTPVerified,
        otp,
        setOtp,
        handleSendOTPToEmail,
        handleVerifyOtp,
    } = useVerifyEmail();
    
    return (
        <main className="container">
            <h3 className="text-center mb-5 mt-3">Forgot Password</h3>
            <Form noValidate validated={validated} onSubmit={handleForgotPassword}>
                <Form.Group className="mb-3" controlId="formTeacherEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter your email"
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button
                    type="button"
                    onClick={() => handleSendOTPToEmail(teacherEmail)}
                    className="mb-3"
                    disabled={!isValidEmail(teacherEmail)}
                >
                    Send OTP
                </Button>

                {isOTPSent && (
                    <>
                        <Form.Group className="mb-3" controlId="formOTP">
                            <Form.Label>Confirm OTP:</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Enter 6-digit OTP"
                                minLength={6}
                                maxLength={6}
                                pattern="\d{6}"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid 6-digit OTP.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            type="button"
                            onClick={() => handleVerifyOtp(teacherEmail)}
                            className="mb-3"
                            disabled={!otp || otp.length !== 6}
                        >
                            Verify OTP
                        </Button>
                    </>
                )}

                <Form.Group className="mb-3" controlId="formTeacherPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        minLength={6}
                        placeholder="Enter password"
                        value={teacherPassword}
                        onChange={(e) => setTeacherPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Password should be at least 6 characters.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="w-100" disabled={!isOTPVerified} >
                    Change Password
                </Button>
            </Form>
        </main>
    );
}

export default TeacherForgotPassword;