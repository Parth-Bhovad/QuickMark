import Attendance from "../models/Attendance.model.js";

export const addAttendance = async (attendanceData) => {
    const attendance = new Attendance(attendanceData);
    await attendance.save();
    return attendance;
};