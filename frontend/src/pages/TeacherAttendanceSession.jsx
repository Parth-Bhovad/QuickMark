import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { Container, Button, Modal, ListGroup, Alert } from "react-bootstrap";

function TeacherAttendanceSession() {
  const { currentUser, authChecked } = useAuthContext();

  const [showPopup, setShowPopup] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isHavingSubjects, setIsHavingSubjects] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [feedback, setFeedback] = useState("");

  const getTeacherSubjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/teachers/${currentUser.id}/subjects`
      );
      console.log(response);
      if (response.data.subjects.length === 0) {
        setIsHavingSubjects(false);
      } else {
        setIsHavingSubjects(true);
        setAvailableSubjects(response.data.subjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authChecked) return;
    getTeacherSubjects();
  }, [authChecked, currentUser]);

  const handleGetOtp = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/attendance/otp",
        { params: { subjectName: selectedSubject } }
      );
      console.log(response);
      setFeedback(`OTP: ${response.data.otp}`);
    } catch (error) {
      console.log(error);
      setFeedback("Failed to fetch OTP.");
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Teacher Attendance Session</h3>

      <Modal
        show={showPopup}
        onHide={() => setShowPopup(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isHavingSubjects && (
            <Alert variant="danger">
              No subjects available.
              <div className="mt-3 text-end">
                <Button variant="secondary" onClick={() => setShowPopup(false)}>
                  Close
                </Button>
              </div>
            </Alert>
          )}

          {isHavingSubjects && (
            <ListGroup>
              {availableSubjects.map((subject) => (
                <ListGroup.Item
                  action
                  key={subject}
                  active={selectedSubject === subject}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setShowPopup(false);
                  }}
                >
                  {subject}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
      </Modal>

      <div className="text-center mt-4">
        <Button
          onClick={handleGetOtp}
          disabled={!selectedSubject}
          className="px-4"
        >
          Get OTP
        </Button>
      </div>

      {feedback && (
        <Alert
          variant={feedback.includes("OTP:") ? "success" : "danger"}
          className="mt-4 text-center"
        >
          {feedback}
        </Alert>
      )}
    </Container>
  );
}

export default TeacherAttendanceSession;
