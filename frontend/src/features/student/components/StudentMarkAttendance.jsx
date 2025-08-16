import { useState, useEffect, useRef } from "react";
import { Form, Container, Alert, Badge, Card } from "react-bootstrap";
import useStudentMarkAttendance from "../hooks/useStudentMarkAttendance";
import LoadingButton from "../../../components/LoadingButton";

function StudentMarkAttendance() {
    const { otp, setOtp, validated, feedback, handleSubmit, submittingAttendance } = useStudentMarkAttendance();

    const otpRef = useRef(null);
    const [focusCount, setFocusCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const [warningMsg, setWarningMsg] = useState("");

    // Paste/drop block
    useEffect(() => {
        const otpEl = otpRef.current;
        if (!otpEl) return;

        let lastLen = otpEl.value.length;

        const handleBeforeInput = (e) => {
            if (e.inputType === "insertFromPaste" || e.inputType === "insertFromDrop") {
                e.preventDefault();
            }
        };

        const handleInput = () => {
            const cur = otpEl.value;
            if (cur.length - lastLen > 1) {
                otpEl.value = cur.slice(0, lastLen);
                setOtp(otpEl.value);
            } else {
                lastLen = cur.length;
            }
        };

        otpEl.addEventListener("beforeinput", handleBeforeInput);
        otpEl.addEventListener("input", handleInput);

        return () => {
            otpEl.removeEventListener("beforeinput", handleBeforeInput);
            otpEl.removeEventListener("input", handleInput);
        };
    }, []);

    // Suspicious activity detection
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
                if (newCount >= 3 && elapsed < 20) {
                    setIsBlocked(true);
                    setWarningMsg("⚠ Suspicious activity detected — Please avoid switching apps while entering OTP.");
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
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Card className="shadow-lg p-4" style={{ maxWidth: "420px", width: "100%" }}>

                <h3 className="text-center fw-bold mb-3 fs-4">Mark Your Attendance</h3>
                <p className="text-muted text-center mb-4" style={{ fontSize: "1.15rem" }}>
                    Please enter the one-time code given by your teacher. Keep this window open while entering.
                </p>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formOtp">
                        <Form.Label className="fw-semibold" style={{ fontSize: "1.1rem" }}>Enter OTP</Form.Label>
                        <Form.Control
                            ref={otpRef}
                            required
                            type="text"
                            minLength={6}
                            placeholder="Enter 6-digit code"
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
                            style={{
                                fontSize: "1.3rem",
                                letterSpacing: "0.15rem",
                                textAlign: "center"
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid OTP.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <LoadingButton
                        loading={submittingAttendance}
                        type="submit"
                        className="w-100"
                        disabled={otp.length < 6 || isBlocked || submittingAttendance}
                    >
                        Mark Attendance
                    </LoadingButton>
                </Form>

                {feedback && (
                    <Alert
                        variant={feedback.includes("successfully") ? "success" : "danger"}
                        className="mt-4 fade show"
                        style={{ fontSize: "1.1rem" }}
                    >
                        {feedback}
                    </Alert>
                )}

                {warningMsg && (
                    <Alert variant="warning" className="mt-3 animate__animated animate__shakeX" style={{ fontSize: "1.1rem" }}>
                        {warningMsg}
                    </Alert>
                )}
            </Card>
        </Container>
    );
}

export default StudentMarkAttendance;
