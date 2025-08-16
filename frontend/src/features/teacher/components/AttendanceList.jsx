import useTeacherAttendanceSession from "../hooks/useTeacherAttendanceSession";
import { Button, Modal, ListGroup, Alert, Card, Container } from "react-bootstrap";
import LoadingButton from "../../../components/LoadingButton";
//importing custom hooks
import useAttendanceList from "../hooks/useAttendanceList";

function AttendanceList() {
    
    const {
        selectedSubject,
        setSelectedSubject,
        isHavingSubjects,
        availableSubjects,
        showPopup,
        setShowPopup,
    } = useTeacherAttendanceSession();
    
    const { gettingAttendance, fetchAttendanceData } = useAttendanceList(selectedSubject);

    return (
        <Container
            className="mt-4 d-flex flex-column"
            style={{ maxWidth: "500px", minHeight: "100vh" }}
        >
            {/* Title */}
            <h3 className="text-center fw-bold mb-4">📋 Attendance Export</h3>

            {/* Subject Selection Card */}
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

            {/* Export Card */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
                <Card.Body className="text-center">
                    <p className="text-muted mb-3">
                        Click the button below to download the attendance data as an Excel
                        file.
                    </p>
                    <LoadingButton
                        loading={gettingAttendance}
                        onClick={fetchAttendanceData}
                        disabled={!selectedSubject || gettingAttendance}
                        size="lg"
                        className="px-5 py-2 fw-semibold"
                    >
                        Download Attendance
                    </LoadingButton>
                </Card.Body>
            </Card>

            {/* Subject Selection Modal */}
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

export default AttendanceList;
