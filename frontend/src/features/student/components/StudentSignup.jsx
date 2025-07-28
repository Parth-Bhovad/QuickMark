import { Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import useVerifyEmail from "../../../hooks/useVerifyEmail";
import isValidEmail from "../../../utils/isValidEmail";

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
    handleRegisterStudent,
    validated,
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
      <h3 className="text-center mb-5 mt-3">Student Signup Page</h3>

      <Form noValidate validated={validated} onSubmit={(e) => handleRegisterStudent(e, otp)}>
        <Form.Group className="mb-3" controlId="formStudentEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter your email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="button"
          onClick={() => handleSendOTPToEmail(studentEmail)}
          className="mb-3"
          disabled={!isValidEmail(studentEmail)}
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
              onClick={() => handleVerifyOtp(studentEmail)}
              className="mb-3"
              disabled={!otp || otp.length !== 6}
            >
              Verify OTP
            </Button>
          </>
        )}

        <Form.Group className="mb-3" controlId="formRollNo">
          <Form.Label>Roll Number:</Form.Label>
          <Form.Control
            required
            type="number"
            min={10000}
            max={99999}
            placeholder="Enter roll number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Roll number should be between 10000 and 99999.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStudentName">
          <Form.Label>Student Name:</Form.Label>
          <Form.Control
            required
            type="text"
            pattern="^[A-Za-z ]+$"
            placeholder="Enter your name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Name can only contain letters and spaces.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStudentPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            required
            type="password"
            minLength={6}
            placeholder="Enter password"
            value={studentPassword}
            onChange={(e) => setStudentPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Password should be at least 6 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="w-100" disabled={!isOTPVerified} >
          Sign Up
        </Button>
      </Form>
    </main>
  );
}

export default StudentSignup;