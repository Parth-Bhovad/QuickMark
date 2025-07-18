import { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function StudentMarkAttendance() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [validated, setValidated] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { currentUser } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/attendance/",
          {
            otp,
            isPresent: true,
            studentId: currentUser.id,
          }
        );
        console.log(res);
        setFeedback("Attendance marked successfully!");
      } catch (error) {
        console.log(error);
        setFeedback("Failed to mark attendance.");
      }
    }

    setValidated(true);
  };

  useEffect(() => {
    const checkActiveSession = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/attendance/check-active-session"
        );
        console.log(res.status);
      } catch (error) {
        console.log(error.status);
        if(error.status === 429){
          navigate("/");
        }
      }
    };

    checkActiveSession();
  }, []);

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
