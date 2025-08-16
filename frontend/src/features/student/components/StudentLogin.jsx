import { Form, Button, Alert } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import LoadingButton from "../../../components/LoadingButton";
import { useState } from "react";

function StudentLogin() {
  // using custom hook
  const {
    studentEmail,
    setStudentEmail,
    studentPassword,
    setStudentPassword,
    handleLoginStudent,
    validated,
    error,
    setError,
    loggingInStudent
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="container mt-5 pt-5">
      <h3 className="text-center mb-5 mt-3">Student Login Page</h3>

      <Form noValidate validated={validated} onSubmit={handleLoginStudent}>
        <Form.Group className="mb-3" controlId="formStudentEmail">
          <Form.Label>Student Email:</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formStudentPassword">
          <Form.Label>Student Password:</Form.Label>
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

        <LoadingButton
          loading={loggingInStudent}
          disabled={!studentEmail || !studentPassword || loggingInStudent}
          type="submit"
          className="w-100"
        >
          Login
        </LoadingButton>
      </Form>
      {error && (
        <div className="w-100 mt-3">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
      <div className="d-flex justify-content-between mt-3">
        <Link to="/student-forgot-password" className="text-decoration-none">
          Forgot password?
        </Link>
        <Link to="/student-signup" className="text-decoration-none">
          Don't have an account?
        </Link>
      </div>
    </main>
  );
}

export default StudentLogin;