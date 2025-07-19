// importing custom hook
import useStudentProfile from "../hooks/useStudentProfile";

function StudentProfile() {
    const {
        studentName,
        showInput,
        setShowInput,
        subjects,
        subjectName,
        setSubjectName,
        rollNo,
        loading,
        error,
        handleAddSubject
    } = useStudentProfile();

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
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        placeholder="Enter subject name"
                        disabled={loading}
                    />
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary"
                            onClick={handleAddSubject}
                            disabled={loading}
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
        </div>
    );
}

export default StudentProfile;