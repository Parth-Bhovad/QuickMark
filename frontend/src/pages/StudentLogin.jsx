import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
        studentEmail: "",
        studentPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/students/login", {
                studentEmail: formData.studentEmail,
                studentPassword: formData.studentPassword
            },{withCredentials: true});
            // handle success (e.g., redirect or show message)
            console.log(response.data);
        } catch (error) {
            // handle error (e.g., show error message)
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Student Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="studentEmail"
                        value={formData.studentEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Student Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="studentPassword"
                        value={formData.studentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;