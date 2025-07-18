import { Form, Button, Container, Alert } from "react-bootstrap";
//importing custom hooks
import useStudentMarkAttendance from "../hooks/useStudentMarkAttendance";

function StudentMarkAttendance() {
    const { otp, setOtp, validated, setValidated, feedback, setFeedback, handleSubmit } = useStudentMarkAttendance();
    return (
        <Container className="mt-5">
            <h3 className="text-center mb-4">Student Mark Attendance</h3>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formOtp">
                    <Form.Label>Enter OTP:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        minLength={6}
                        placeholder="Enter the OTP you received"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid OTP.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" disabled={otp.length < 6} className="w-100">
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
        </Container>
    );
}

export default StudentMarkAttendance;