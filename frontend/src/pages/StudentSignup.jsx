import axios from 'axios';
import React, { useState } from 'react';

const BACKEND_URL = 'http://localhost:3000/api/v1/students/';

function Signup() {
    const [rollNo, setRollNo] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:3000/api/v1/students/', {
                rollNo,
                studentName,
                studentPassword,
                studentEmail,
            }, { withCredentials: true });
            console.log(response);
            
            setSuccess('Signup successful!');
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    const handleSendOTPToEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/authenticate/send-otp", {
                email: studentEmail
            });
            console.log(response);
            if(response.status === 200) {
                setEmailVerified(true);
                setSuccess('OTP sent to your email. Please verify to complete signup.');
            }
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/authenticate/verify-otp", {
                email: studentEmail,
                otp
            });
            console.log(response);
            if(response.status === 200) {
                setSuccess('OTP verified successfully!');
            }
        } catch (err) {
            setError('Failed to verify OTP. Please try again.');
        }
    };

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rollNo">Roll Number:</label>
                    <input
                        type="number"
                        id="rollNo"
                        name="rollNo"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="studentName">Student Name:</label>
                    <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="studentPassword">Password:</label>
                    <input
                        type="password"
                        id="studentPassword"
                        name="studentPassword"
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="studentEmail">Email:</label>
                    <input
                        type="email"
                        id="studentEmail"
                        name="studentEmail"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                    />
                    <button onClick={handleSendOTPToEmail}>Verify Email</button>
                </div>
                { emailVerified && (
                    <div>
                        <label htmlFor="otp">OTP:</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={handleVerifyOtp}>Verify OTP</button>
                    </div>
                )}
                <button type="submit" disabled={!emailVerified}>Sign Up</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
            </form>
        </div>
    );
}

export default Signup;