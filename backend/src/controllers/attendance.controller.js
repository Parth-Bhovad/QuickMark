//importing services
import { addAttendanceService } from "../services/attendance.service.js";
//importing utils
import { getVerificationCode } from "../utils/generateOTP.js";

export const addAttendance = async (req, res) => {
    try {
        const getOTP = getVerificationCode(req.body.subjectName);
        console.log(getOTP);
        
        if (getOTP != req.body.otp) {
            return res.status(404).json({ message: "Invalid OTP" });
        }
        const {studentId, subjectId, isPresent=false} = req.body;
        const attendance = await addAttendanceService({studentId, subjectId, isPresent});
        res.status(201).json({ message: "Attendance added successfully", attendance });
    } catch (error) {
        console.error("Error adding attendance:", error);
        res.status(500).json({ message: "Internal server error" }); 
        
    }
}