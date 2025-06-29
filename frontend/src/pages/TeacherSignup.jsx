import { useState } from "react";
import axios from "axios";

function TeacherSignup() {
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");
    const [teacherName, setTeacherName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/v1/teachers/", {
                teacherEmail: teacherEmail,
                teacherPassword: teacherPassword,
                teacherName: teacherName,
            }, {
                withCredentials: true, // to include cookies in the request
            });
            // handle success (e.g., redirect or show message)
        } catch (error) {
            // handle error (e.g., show error message)
        }
    };
    return (
        <div>
            <h1>Teacher Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Teacher Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="teacherEmail"
                        required
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Teacher Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="teacherPassword"
                        required
                        value={teacherPassword}
                        onChange={(e) => setTeacherPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="name">Teacher Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="teacherName"
                        required
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default TeacherSignup;