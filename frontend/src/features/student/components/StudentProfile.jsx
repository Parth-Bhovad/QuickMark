import { Card, Form, Button } from "react-bootstrap";
import useStudentProfile from "../hooks/useStudentProfile";
import useLogoutUser from "../../../hooks/useLogoutUser";
import LoadingButton from "../../../components/LoadingButton";

function StudentProfile() {
  const {
    studentName,
    showInput,
    setShowInput,
    availableSubjects,
    subjects,
    subjectName,
    setSubjectName,
    rollNo,
    error,
    handleAddSubject,
    addingSubject
  } = useStudentProfile();

  const { handleLogout, loggingOut } = useLogoutUser();

  return (
    <div
      className="container mt-4 d-flex flex-column"
      style={{ maxWidth: "500px", minHeight: "100vh" }}
    >
      {/* Profile Card */}
      <Card className="shadow-sm border-0 rounded-4 mb-4">
        <Card.Body className="text-center">
          {/* Avatar */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#e9f2ff",
              borderRadius: "50%",
              margin: "0 auto 15px auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#007bff",
            }}
          >
            {studentName ? studentName.charAt(0).toUpperCase() : "S"}
          </div>

          <h5 className="fw-bold">{studentName}</h5>
          <p className="text-muted mb-1">Roll No: {rollNo}</p>
          <p className="text-muted">
            Subjects:{" "}
            {subjects.length ? subjects.join(", ") : "No subjects yet"}
          </p>
        </Card.Body>
      </Card>

      {/* Add Subject */}
      <Card className="shadow-sm border-0 rounded-4 mb-4">
        <Card.Body>
          {!showInput ? (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => setShowInput(true)}
            >
              + Add Subject
            </Button>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Select Subject</Form.Label>
                <Form.Select
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                >
                  <option value="">-- Select a subject --</option>
                  {availableSubjects
                    .filter((subject) => !subjects.includes(subject))
                    .map((subject, idx) => (
                      <option key={idx} value={subject}>
                        {subject}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <div className="d-flex gap-2">
                <LoadingButton
                  loading={addingSubject}
                  variant="primary"
                  className="flex-grow-1"
                  onClick={handleAddSubject}
                  disabled={!subjectName}
                >
                  Add Subject
                </LoadingButton>
                <Button
                  variant="outline-secondary"
                  className="flex-grow-1"
                  onClick={() => setShowInput(false)}
                >
                  Cancel
                </Button>
              </div>

              {error && <div className="text-danger mt-2">{error}</div>}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Push logout button to bottom */}
      <div className="mt-auto pb-4">
        <LoadingButton
          loading={loggingOut}
          variant="outline-danger"
          className="w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </LoadingButton>
      </div>
    </div>
  );
}

export default StudentProfile;
