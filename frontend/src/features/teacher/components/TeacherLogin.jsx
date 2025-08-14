import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import LoadingButton from "../../../components/LoadingButton";
import { useState } from "react";

function TeacherLogin() {
  const {
    teacherEmail,
    setTeacherEmail,
    teacherPassword,
    setTeacherPassword,
    handleLoginTeacher,
    validated,
    error,
    loggingInTeacher
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="container">
      <h3 className="text-center mb-5 mt-3">Teacher Login Page</h3>

      <Form noValidate validated={validated} onSubmit={handleLoginTeacher}>
        <Form.Group className="mb-3" controlId="formTeacherEmail">
          <Form.Label>Teacher Email:</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formTeacherPassword">
          <Form.Label>Teacher Password:</Form.Label>
          <div className="input-group">
            <Form.Control
              required
              type={showPassword ? "text" : "password"}
              minLength={6}
              placeholder="Enter password"
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
        <LoadingButton
          loading={loggingInTeacher}
          type="submit"
          variant="primary"
          className="w-100 mt-3"
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
        <Link to="/teacher-forgot-password" className="text-decoration-none">
          Forgot password?
        </Link>
        <Link to="/teacher-signup" className="text-decoration-none">
          Don't have an account?
        </Link>
      </div>
    </main>
  );
}

export default TeacherLogin;