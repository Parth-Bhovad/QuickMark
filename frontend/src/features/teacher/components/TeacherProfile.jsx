import { Card, Form, Button } from "react-bootstrap";
import useTeacherProfile from "../hooks/useTeacherProfile";
import useLogoutUser from "../../../hooks/useLogoutUser";
import LoadingButton from "../../../components/LoadingButton"

function TeacherProfile() {
  const {
    teacherName,
    subjects,
    showInput,
    setShowInput,
    subjectName,
    setSubjectName,
    handleSubmit,
    loading,
    error,
  } = useTeacherProfile();

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
            {teacherName ? teacherName.charAt(0).toUpperCase() : "T"}
          </div>

          <h5 className="fw-bold">{teacherName}</h5>
          <p className="text-muted mb-1">Teacher</p>
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
                <Form.Label className="fw-semibold">
                  Enter Subject Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="Enter subject name"
                  disabled={loading}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <LoadingButton
                  loading={loading}
                  onClick={handleSubmit}
                  disabled={!subjectName.trim() || loading}
                  className="flex-grow-1"
                >
                  Submit
                </LoadingButton>
                <Button
                  variant="outline-secondary"
                  className="flex-grow-1"
                  onClick={() => setShowInput(false)}
                  disabled={loading}
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

export default TeacherProfile;