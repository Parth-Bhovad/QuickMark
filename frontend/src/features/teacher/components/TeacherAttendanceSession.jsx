import { Container, Button, Modal, ListGroup, Alert } from "react-bootstrap";
//importing hooks
import useTeacherAttendanceSession from "../hooks/useTeacherAttendanceSession";

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
        setShowPopup
    } = useTeacherAttendanceSession();

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
                    onClick={async () => {
                        await handleGetOtp();
                    }}
                    disabled={!selectedSubject || timer > 0}
                    className="px-4"
                >
                    Get OTP
                </Button>
            </div>

            {timer > 0 && (
                <div className="text-center mt-3">
                    <Alert variant="info">OTP valid for: {timer} seconds</Alert>
                </div>
            )}

            {feedback && (
                <Alert
                    variant={feedback.includes("Failed") ? "danger" : "success"}
                    className="mt-4 text-center"
                >
                    {feedback}
                </Alert>
            )}
        </Container>
    );
}

export default TeacherAttendanceSession;
