import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function TeacherProfile() {

    const {currentUser, authChecked} = useAuthContext();

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
            // Replace with your backend endpoint
            const res = await axios.patch(`http://localhost:3000/api/v1/teachers/${currentUser.id}/subjects`, { subjectName });
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
      const response = await axios.get(`http://localhost:3000/api/v1/teachers/${currentUser.id}/subjects`);
      console.log(response);
      if(response.data.subjects.length !==0){
        setSubjects(response.data.subjects);
      }

    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
        if (!authChecked) {
            return;
        }
        getTeacherSubjects();
    }, [authChecked, currentUser]);

    return (
        <>
            <h1>Teacher Profile</h1>
            <div>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Subjects:</strong> {subjects.join(", ")}</p>
                <button onClick={handleAddClick}>Add Subject</button>
                {showInput && (
                    <div>
                        <input
                            type="text"
                            value={subjectName}
                            onChange={handleInputChange}
                            placeholder="Enter subject name"
                            disabled={loading}
                        />
                        <button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Adding..." : "Submit"}
                        </button>
                        <button onClick={() => setShowInput(false)} disabled={loading}>Cancel</button>
                        {error && <div style={{ color: "red" }}>{error}</div>}
                    </div>
                )}
            </div>
        </>
    );
}

export default TeacherProfile;