import { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import useStudentMarkAttendance from "../hooks/useStudentMarkAttendance";

function StudentMarkAttendance() {
    const { otp, setOtp, validated, feedback, handleSubmit } = useStudentMarkAttendance();

    const otpRef = useRef(null);
    const [focusCount, setFocusCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const [warningMsg, setWarningMsg] = useState("");

    useEffect(() => {
        const input = otpRef.current;

        const handleFocus = () => {
            if (!startTime) setStartTime(Date.now());
        };

        const handleBlur = () => {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000;

            setFocusCount(prev => {
                const newCount = prev + 1;

                // If blurred 3+ times within 20 seconds, consider suspicious
                if (newCount >= 3 && elapsed < 20) {
                    setIsBlocked(true);
                    setWarningMsg("Suspicious activity detected. Please avoid switching apps while entering OTP.");
                }

                return newCount;
            });
        };

        if (input) {
            input.addEventListener("focus", handleFocus);
            input.addEventListener("blur", handleBlur);
        }

        return () => {
            if (input) {
                input.removeEventListener("focus", handleFocus);
                input.removeEventListener("blur", handleBlur);
            }
        };
    }, [startTime]);

    return (
        <Container className="mt-5">
            <h3 className="text-center mb-4">Student Mark Attendance</h3>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formOtp">
                    <Form.Label>Enter OTP:</Form.Label>
                    <Form.Control
                        ref={otpRef}
                        required
                        type="text"
                        minLength={6}
                        placeholder="Enter the OTP you received"
                        value={otp}
                        disabled={isBlocked}
                        onChange={(e) => setOtp(e.target.value)}
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        onDrop={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                        autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid OTP.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" disabled={otp.length < 6 || isBlocked} className="w-100">
                    Submit
                </Button>
            </Form>

            {feedback && (
                <Alert
                    variant={feedback.includes("successfully") ? "success" : "danger"}
                    className="mt-4"
                >
                    {feedback}
                </Alert>
            )}

            {warningMsg && (
                <Alert variant="warning" className="mt-3">
                    {warningMsg}
                </Alert>
            )}
        </Container>
    );
}

export default StudentMarkAttendance;
