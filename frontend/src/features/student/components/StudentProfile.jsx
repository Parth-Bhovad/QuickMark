// importing custom hook
import useStudentProfile from "../hooks/useStudentProfile";
import useLogoutUser from "../../../hooks/useLogoutUser";

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
        loading,
        error,
        handleAddSubject
    } = useStudentProfile();

    const { handleLogout } = useLogoutUser();

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Student Profile</h2>

            <div className="mb-3">
                <p><strong>Name:</strong> {studentName}</p>
                <p><strong>Roll No:</strong> {rollNo}</p>
                <p><strong>Subjects:</strong>{subjects.join(", ")}</p>
            </div>
            <button className="btn btn-primary mb-3" onClick={() => setShowInput(true)}>
                Add Subject
            </button>

            {showInput && (
                <div className="mb-3">
                    <label htmlFor="subject-select" className="form-label">Select Subject</label>
                    <select
                        id="subject-select"
                        className="form-select mb-2"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        disabled={loading}
                    >
                        <option value="">-- Select a subject --</option>
                        {availableSubjects.filter(subject => !subjects.includes(subject))
                            .map((subject, idx) => (
                                <option key={idx} value={subject}>
                                    {subject}
                                </option>
                            ))}
                    </select>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary"
                            onClick={handleAddSubject}
                            disabled={loading || !subjectName}
                        >
                            {loading ? "Adding..." : "Submit"}
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowInput(false)}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                    {error && <div className="text-danger mt-2">{error}</div>}
                </div>
            )}
            <div className="mt-4">
                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default StudentProfile;