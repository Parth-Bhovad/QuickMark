//importing services
import { addAttendanceService } from "../services/attendance.service.js";

export const addAttendance = async (req, res) => {
    try {
        const {studentId, subjectId, isPresent=false} = req.body;
        const attendance = await addAttendanceService({studentId, subjectId, isPresent});
        res.status(201).json({ message: "Attendance added successfully", attendance });
    } catch (error) {
        console.error("Error adding attendance:", error);
        res.status(500).json({ message: "Internal server error" }); 
        
    }
}