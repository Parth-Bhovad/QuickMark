import React, { useState } from "react";
import axios from "axios";

function TeacherLogin() {
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("http://localhost:3000/api/v1/teachers/login", {
                teacherEmail,
                teacherPassword,
            }, { withCredentials: true }); // to include cookies in the request
            // handle success (e.g., save token, redirect, etc.)
            console.log(response.data);
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            <h1>Teacher Login Page</h1>
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
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default TeacherLogin;