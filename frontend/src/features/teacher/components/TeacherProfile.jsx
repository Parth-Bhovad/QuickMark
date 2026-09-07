import { Card, Form, Button } from "react-bootstrap";
import useTeacherProfile from "../hooks/useTeacherProfile";
import useLogoutUser from "../../../hooks/useLogoutUser";
import LoadingButton from "../../../components/LoadingButton"
import useGetSubjects from "../hooks/useGetSubject";

function TeacherProfile() {
  const {
    teacherName,
    subjects,
    showAddSubjectInput,
    setShowAddSubjectInput,
    showRemoveSubjectInput,
    setShowRemoveSubjectInput,
    subjectName,
    setSubjectName,
    handleSubmit,
    isAddSubjectPending,
    isAddSubjectError,
    isQueryPending,
    subjectError,
    queryError,
    isQueryError,
    removeSubject,
    isRemoveSubjectPending,
    isRemoveSubjectError,
    removeSubjectError
  } = useTeacherProfile();

  const { handleLogout, loggingOut } = useLogoutUser();

  const { allSubjects } = useGetSubjects();

  return (
    <main
      className="container mt-5 d-flex flex-column pt-5"
      style={{ maxWidth: "500px", minHeight: "90vh" }}
    >
      {/* Profile Card */}
      {isQueryPending ? (<div>loading</div>) : (
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
      )}

      {/* Add Subject */}
      <Card className="shadow-sm border-0 rounded-4 mb-4">
        <Card.Body>
          {!showAddSubjectInput ? (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => setShowAddSubjectInput(true)}
            >
              + Add Subject
            </Button>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold"> Select Subject from Available Subjects </Form.Label>

                <Form.Select
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                >
                  <option value="" disabled hidden>Select a subject</option>
                  {allSubjects.filter(sub => !subjects.includes(sub))
                    .map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                </Form.Select>
                <div className="p-3 w-full text-center fw-semibold">
                  OR
                </div>
                <Form.Label className="fw-semibold">
                  Enter Name of new Subject
                </Form.Label>
                <Form.Control
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="Enter subject name"
                  disabled={isAddSubjectPending}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <LoadingButton
                  loading={isAddSubjectPending}
                  onClick={handleSubmit}
                  disabled={!subjectName.trim() || isAddSubjectPending}
                  className="flex-grow-1"
                >
                  Submit
                </LoadingButton>
                <Button
                  variant="outline-secondary"
                  className="flex-grow-1"
                  onClick={() => setShowAddSubjectInput(false)}
                  disabled={isAddSubjectPending}
                >
                  Cancel
                </Button>
              </div>

              {isAddSubjectError && <div className="text-danger mt-2">{subjectError.message}</div>}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Remove Subject */}
      <Card className="shadow-sm border-0 rounded-4 mb-4">
        <Card.Body>
          {!showRemoveSubjectInput ? (
            <Button
              variant="danger"
              className="w-100"
              onClick={() => setShowRemoveSubjectInput(true)}
            >
              Remove Subject
            </Button>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold"> Select Subject to remove </Form.Label>

                <Form.Select
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                >
                  <option value="" disabled hidden>Select a subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="d-flex gap-2">
                <LoadingButton
                  loading={isRemoveSubjectPending}
                  onClick={async () => { await removeSubject() }}
                  disabled={!subjectName.trim() || isRemoveSubjectPending}
                  className="flex-grow-1"
                >
                  Remove
                </LoadingButton>
                <Button
                  variant="outline-secondary"
                  className="flex-grow-1"
                  onClick={() => setShowRemoveSubjectInput(false)}
                  disabled={isRemoveSubjectPending}
                >
                  Cancel
                </Button>
              </div>

              {isRemoveSubjectError && <div className="text-danger mt-2">{removeSubjectError.message}</div>}
            </>
          )}
        </Card.Body>
      </Card>

      {isQueryError && <div className="text-danger mt-2">{queryError.message}</div>}

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

export default TeacherProfile;