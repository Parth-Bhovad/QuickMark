import { Container, Button, Modal, ListGroup, Alert, Card } from "react-bootstrap";
//importing hooks
import useTeacherAttendanceSession from "../hooks/useTeacherAttendanceSession";
import LoadingButton from "../../../components/LoadingButton";
function TeacherAttendanceSession() {
  const {
    selectedSubject,
    setSelectedSubject,
    isHavingSubjects,
    availableSubjects,
    feedback,
    handleGetOtp,
    timer,
    showPopup,
    setShowPopup,
    gettingOtp,
  } = useTeacherAttendanceSession();

  return (
    <Container
      className="mt-4 d-flex flex-column justify-content-center align-items-center"
      style={{ maxWidth: "500px", minHeight: "100vh" }}
    >
      {/* Title */}
      <h3 className="text-center fw-bold mb-4">Teacher Attendance Session</h3>

      {/* Selected subject card */}
      <Card className="shadow-sm border-0 rounded-4 mb-4">
        <Card.Body className="text-center">
          <p className="mb-2 text-muted">Selected Subject</p>
          <h5 className="fw-semibold">
            {selectedSubject || <span className="text-secondary">None</span>}
          </h5>
          <Button
            variant="outline-primary"
            className="mt-3"
            onClick={() => setShowPopup(true)}
          >
            {selectedSubject ? "Change Subject" : "Select Subject"}
          </Button>
        </Card.Body>
      </Card>

      {/* Get OTP card */}
      <Card className="shadow-sm border-0 rounded-4 mb-4">
        <Card.Body className="text-center">
          <LoadingButton
            loading={timer > 0}
            variant="primary"
            size="lg"
            className="px-5 py-2 fw-semibold"
            onClick={async () => {
              await handleGetOtp();
            }}
            disabled={!selectedSubject || gettingOtp}
          >
            Get OTP
          </LoadingButton>

          {timer > 0 && (
            <Alert
              variant="info"
              className="mt-3 py-2 mb-0 rounded-3"
            >
              OTP valid for: <strong>{timer}</strong> seconds
            </Alert>
          )}
        </Card.Body>
        {/* Feedback */}
        {feedback && (
          <Alert
            variant={feedback.includes("Failed") ? "danger" : "success"}
            className="text-center mt-3 py-2 mb-0 rounded-4 shadow-sm"
          >
            {feedback}
          </Alert>
        )}
      </Card>

      {/* Subject selection modal */}
      <Modal
        show={showPopup}
        onHide={() => setShowPopup(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">Select Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isHavingSubjects && (
            <Alert variant="danger" className="rounded-4">
              No subjects available.
              <div className="mt-3 text-end">
                <Button
                  variant="secondary"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </Button>
              </div>
            </Alert>
          )}

          {isHavingSubjects && (
            <ListGroup className="rounded-4 overflow-hidden">
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
    </Container>
  );
}

export default TeacherAttendanceSession;
