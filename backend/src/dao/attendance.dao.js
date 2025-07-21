import Attendance from "../models/Attendance.model.js";

export const addAttendance = async (attendanceData) => {
    const attendance = new Attendance(attendanceData);
    await attendance.save();
    return attendance;
};

export const findAttendance = async (studentId, date, subjectId) => {
    const attendance = await Attendance.findOne({ studentId, date, subjectId });
    return attendance;
};

export const deleteAttendance = async (attendanceId) => {
    await Attendance.deleteOne({ _id: attendanceId });
};