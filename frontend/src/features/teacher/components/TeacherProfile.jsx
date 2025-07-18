//importing custom hooks
import useTeacherProfile from "../hooks/useTeacherProfile";

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
        error
    } = useTeacherProfile();
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Teacher Profile</h2>
            <div className="mb-3">
                <p><strong>Name:</strong> {teacherName}</p>
                <p><strong>Subjects:</strong> {subjects.join(", ")}</p>
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
                            onClick={handleSubmit}
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

export default TeacherProfile;