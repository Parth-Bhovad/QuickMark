import { Button, Modal, ListGroup, Alert, Form, Card } from "react-bootstrap";
import LoadingButton from "../../../components/LoadingButton";
//importing custom hook
import useTeacherAttendanceSession from "../hooks/useTeacherAttendanceSession";
import useManualAttendance from "../hooks/useManualAttendance";

function AddAttendanceManual() {

    const {
        selectedSubject,
        setSelectedSubject,
        isHavingSubjects,
        availableSubjects,
        showPopup,
        setShowPopup,
    } = useTeacherAttendanceSession();

    const { rollNo, setRollNo, addingManualAttendance, handleSubmit, feedback } = useManualAttendance();
    return (
        <>
            <div className="container my-5 d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: "500px", minHeight: "90vh" }}>
                <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                        <h2 className="card-title mb-4">✏️ Add Attendance Manually</h2>
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
                        <p className="card-text text-muted mb-4">
                            Enter the student's roll number and submit to mark attendance.
                        </p>
                        <Form className="d-flex flex-column align-items-center">
                            <Form.Control
                                type="text"
                                placeholder="Enter Roll No."
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                className="mb-3"
                                style={{ maxWidth: "300px" }}
                                required
                            />
                            <LoadingButton
                                loading={addingManualAttendance}
                                variant="primary"
                                className="mt-3"
                                onClick={(e) => handleSubmit(e, selectedSubject)}
                                type="submit"
                                disabled={!rollNo.trim() || !selectedSubject || addingManualAttendance}
                            >
                                Add Attendance
                            </LoadingButton>
                        </Form>
                    </div>
                </div>
                {/* Feedback */}
            {feedback && (
                <Alert
                    variant={feedback.includes("Failed") ? "danger" : "success"}
                    className="text-center mb-3 py-2 mb-0 rounded-4 shadow-sm"
                >
                    {feedback}
                </Alert>
            )}
            </div>

            {/* Subject Selection Modal */}
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
        </>
    );
}

export default AddAttendanceManual;
