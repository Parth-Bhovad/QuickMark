import { Form, Button, Alert, Spinner } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
// import useVerifyEmail from "../../../hooks/useVerifyEmail";
// import isValidEmail from "../../../utils/isValidEmail";
import LoadingButton from "../../../components/LoadingButton";
import { useState } from "react";

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
    error,
    registeringStudent,
  } = useAuth();

  // const {
  //   isOTPSent,
  //   isOTPVerified,
  //   otp,
  //   setOtp,
  //   handleSendOTPToEmail,
  //   handleVerifyOtp,
  //   emailVerificationError,
  //   sendingOtp,
  //   verifyingOtp
  // } = useVerifyEmail();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="container mt-5 pt-5">
      <h3 className="text-center mb-5 mt-3">Student Signup Page</h3>

      <Form noValidate validated={validated} onSubmit={(e) => handleRegisterStudent(e)}>

        {/* Email */}
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

        {/* /* Send OTP Button */}
        {/* <LoadingButton
          loading={sendingOtp}
          onClick={() => handleSendOTPToEmail(studentEmail)}
          className="mb-3"
          disabled={!isValidEmail(studentEmail) || sendingOtp}
        >
          Send OTP
        </LoadingButton> */}

        {/* OTP Verification */}
        {/* {isOTPSent && (
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
            <LoadingButton
              loading={verifyingOtp}
              onClick={() => handleVerifyOtp(studentEmail)}
              className="mb-3"
              disabled={!otp || otp.length !== 6 || verifyingOtp}
            >
              Verify OTP
            </LoadingButton>
          </>
        )} */}

        {/* Roll Number */}
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

        {/* Name */}
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

        {/* Password */}
        <Form.Group className="mb-3" controlId="formStudentPassword">
          <Form.Label>Password:</Form.Label>
          <div className="input-group">
            <Form.Control
              required
              type={showPassword ? "text" : "password"}
              minLength={6}
              placeholder="Enter password"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
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

        {/* Sign Up */}
        <LoadingButton
          loading={registeringStudent}
          type="submit"
          className="w-100"
          disabled={registeringStudent}
        >
          Sign Up
        </LoadingButton>
      </Form>

      {/* Error Alerts */}
      {error && (
        <div className="w-100 mt-3">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
      {/* {emailVerificationError && (
        <div className="w-100 mt-3">
          <Alert variant="danger">{emailVerificationError}</Alert>
        </div>
      )} */}
    </main>
  );
}

export default StudentSignup;
