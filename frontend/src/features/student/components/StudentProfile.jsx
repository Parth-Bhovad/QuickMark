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
    enrolledSubjects,
    onSubjectChange,
    rollNo,
    error,
    handleAddSubject,
    addingSubject
  } = useStudentProfile();

  const { handleLogout, loggingOut } = useLogoutUser();

  return (
    <main
      className="container mt-4 d-flex flex-column mt-5 pt-5"
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
            {enrolledSubjects.length ? enrolledSubjects.join(", ") : "No subjects yet"}
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
                {availableSubjects
                // .filter((availableSubject) => !enrolledSubjects.includes(availableSubject))
                .map((sub, idx)=>(
                  <Form.Check
                    type="checkbox"
                    label={sub}
                    checked={enrolledSubjects.includes(sub)}
                    onChange={() => onSubjectChange(sub)}
                    key={idx}
                  />
                ))}
              </Form.Group>

              <div className="d-flex gap-2">
                <LoadingButton
                  loading={addingSubject}
                  variant="primary"
                  className="flex-grow-1"
                  onClick={handleAddSubject}
                  // disabled={!subjectName || addingSubject}
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
          disabled={loggingOut}
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </LoadingButton>
      </div>
    </main>
  );
}

export default StudentProfile;
