import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

function TeacherLogin() {
  const {
    teacherEmail,
    setTeacherEmail,
    teacherPassword,
    setTeacherPassword,
    handleLoginTeacher,
    validated
  } = useAuth();

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
          <Form.Control
            required
            type="password"
            minLength={6}
            placeholder="Enter password"
            value={teacherPassword}
            onChange={(e) => setTeacherPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Password should be at least 6 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </main>
  );
}

export default TeacherLogin;