import * as XLSX from "xlsx"
import axios from "axios"
import useTeacherAttendanceSession from "../features/teacher/hooks/useTeacherAttendanceSession";
import {Button, Modal, ListGroup, Alert } from "react-bootstrap";

function AttendanceList() {
    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/attendance/${selectedSubject}`)

            const attendance = response.data.attendance

            // Convert JSON to worksheet
            const worksheet = XLSX.utils.json_to_sheet(attendance)

            // Create a workbook and add the worksheet
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance")

            // Save the workbook
            XLSX.writeFile(workbook, "attendance-data.xlsx")
        } catch (err) {
            console.error("Error exporting attendance:", err)
        }
    }
    const {
        selectedSubject,
        setSelectedSubject,
        isHavingSubjects,
        availableSubjects,
        showPopup,
        setShowPopup
    } = useTeacherAttendanceSession();

    return (
        <>
            <div className="container my-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                        <h2 className="card-title mb-4">📋 Attendance Export</h2>
                        <p className="card-text text-muted mb-4">
                            Click the button below to download the attendance data as an Excel file.
                        </p>
                        <button className="btn btn-primary px-4 py-2" onClick={fetchAttendanceData} disabled={!selectedSubject}>
                            Export to Excel
                        </button>
                    </div>
                </div>
            </div>
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
    )
}

export default AttendanceList;