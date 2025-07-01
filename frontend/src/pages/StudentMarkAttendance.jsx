import { useState } from "react";
import axios from "axios";

function StudentMarkAttendance() {
    const [otp, setOtp] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/attendance/", { otp, subjectName:"WEB", isPresent:true,studentId:"686122728243239b2603d768", subjectId:"686250d85ff470fd3dcbd332" });
            console.log(res);
            // alert("Attendance marked successfully!");

        } catch (error) {
            // alert("Failed to mark attendance.");
            console.log(error);
            
        }
    };

    return (
        <>
            <h1>Student Mark Attendance</h1>
            <div>
                <label htmlFor="otp">Enter OTP:</label>
                <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
}

export default StudentMarkAttendance;
