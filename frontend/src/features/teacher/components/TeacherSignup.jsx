import { Form, Button, Alert } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import useVerifyEmail from "../../../hooks/useVerifyEmail";
import isValidEmail from "../../../utils/isValidEmail";
import { useState } from "react";

function TeacherSignup() {
  const {
    teacherName,
    setTeacherName,
    teacherEmail,
    setTeacherEmail,
    teacherPassword,
    setTeacherPassword,
    handleRegisterTeacher,
    validated,
    error
  } = useAuth();

  const {
    isOTPSent,
    isOTPVerified,
    otp,
    setOtp,
    handleSendOTPToEmail,
    handleVerifyOtp,
    emailVerificationError
  } = useVerifyEmail();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="container">
      <h3 className="text-center mb-5 mt-3">Teacher Signup Page</h3>
      <Form noValidate validated={validated} onSubmit={(e) => handleRegisterTeacher(e, otp)}>
        <Form.Group className="mb-3" controlId="formTeacherEmail">
          <Form.Label>Teacher Email:</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter your email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
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
                minLength={6}
                placeholder="Enter OTP"
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

        <Form.Group className="mb-3" controlId="formTeacherName">
          <Form.Label>Teacher Name:</Form.Label>
          <Form.Control
            required
            type="text"
            pattern="^[A-Za-z ]+$"
            placeholder="Enter your name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid name (letters and spaces only).
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTeacherPassword">
          <Form.Label>Teacher Password:</Form.Label>
          <div className="input-group">
            <Form.Control
              required
              type={showPassword ? "text" : "password"}
              minLength={6}
              placeholder="Password"
              value={teacherPassword}
              onChange={(e) => setTeacherPassword(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              tabIndex={-1}
            >
              {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </Button>
          </div>
          <Form.Control.Feedback type="invalid">
            Password should be at least 6 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="w-100" disabled={!isOTPVerified}>
          Sign Up
        </Button>
      </Form>
      {error && (
        <div className="w-100 mt-3">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
      {emailVerificationError && (
        <div className="w-100 mt-3">
          <Alert variant="danger">{emailVerificationError}</Alert>
        </div>
      )}
    </main>
  );
}

export default TeacherSignup;