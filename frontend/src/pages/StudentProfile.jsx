import { useState } from "react";
import axios from "axios";

function StudentProfile() {
    const [subjectName, setSubjectName] = useState(["Mathematics", "Science", "English"]);
    const [newSubject, setNewSubject] = useState("");

    const handleAddSubject = async () => {
        if (!newSubject.trim()) return;
        try {
            // Replace with your actual API endpoint
            await axios.patch("http://localhost:3000/api/v1/students/685fb76f0c3f7eb7031f719a/subjects", { subjectName: newSubject });
            setSubjectName([...subjectName, newSubject]);
            setNewSubject("");
        } catch (error) {
            console.error("Failed to add subject:", error);
        }
    };
    const [showAddSubject, setShowAddSubject] = useState(false);

    return (
        <div>
            <h1>Student Profile</h1>

            <div>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Roll No:</strong> 12345</p>
                <p>
                    <strong>Subjects:</strong> {subjectName.join(", ")}
                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => setShowAddSubject(true)}
                    >
                        Add Subject
                    </button>
                </p>
                {showAddSubject && (
                    <div style={{ marginTop: "10px" }}>
                        <input
                            type="text"
                            value={newSubject}
                            onChange={e => setNewSubject(e.target.value)}
                            placeholder="Enter subject name"
                        />
                        <button onClick={handleAddSubject}>Add</button>
                        <button onClick={() => setShowAddSubject(false)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentProfile;