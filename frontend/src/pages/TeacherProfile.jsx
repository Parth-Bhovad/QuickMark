import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function TeacherProfile() {
    const { currentUser, authChecked } = useAuthContext();

    const [subjects, setSubjects] = useState(["No subjects available"]);
    const [showInput, setShowInput] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddClick = () => {
        setShowInput(true);
        setError("");
    };

    const handleInputChange = (e) => {
        setSubjectName(e.target.value);
    };

    const handleSubmit = async () => {
        if (!subjectName.trim()) {
            setError("Subject name cannot be empty.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await axios.patch(
                `http://localhost:3000/api/v1/teachers/${currentUser.id}/subjects`,
                { subjectName }
            );
            setSubjects([...subjects, subjectName]);
            setSubjectName("");
            setShowInput(false);
        } catch (err) {
            setError("Failed to add subject.");
        } finally {
            setLoading(false);
        }
    };

    const getTeacherSubjects = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/teachers/${currentUser.id}/subjects`
            );
            if (response.data.subjects.length !== 0) {
                setSubjects(response.data.subjects);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!authChecked) return;
        getTeacherSubjects();
    }, [authChecked, currentUser]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Teacher Profile</h2>
            <div className="mb-3">
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Subjects:</strong> {subjects.join(", ")}</p>
            </div>
            <button className="btn btn-primary mb-3" onClick={handleAddClick}>
                Add Subject
            </button>

            {showInput && (
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={subjectName}
                        onChange={handleInputChange}
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