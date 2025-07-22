import { Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import {Link} from "react-router-dom";

function StudentLogin() {
  // using custom hook
  const {
    studentEmail,
    setStudentEmail,
    studentPassword,
    setStudentPassword,
    handleLoginStudent,
    validated,
  } = useAuth();

  return (
    <main className="container">
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

        <Button type="submit" className="w-100">
          Login
        </Button>
      </Form>
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