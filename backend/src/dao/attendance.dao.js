import Attendance from "../models/Attendance.model.js";

export const addAttendance = async (attendanceData) => {
    const attendance = new Attendance(attendanceData);
    await attendance.save();
    return attendance;
};

export const addInitialAttendance = async (attendanceData) => {
    const attendance = await Attendance.insertMany(attendanceData);
    return attendance;
};

export const findAttendance = async (studentId, date, subjectId) => {
    const attendance = await Attendance.findOne({ studentId, date, subjectId });
    return attendance;
};

export const deleteAttendance = async (attendanceId) => {
    await Attendance.deleteOne({ _id: attendanceId });
};

export const findAllAttendanceBySubject = async (subjectId) => {
    const attendance = await Attendance.find({ subjectId });
    return attendance;
};

export const findAttendanceAndMarkPresent = async (studentId, date, subjectId) => {
    const attendance = await findAttendance(studentId, date, subjectId);
    if (attendance) {
        attendance.isPresent = true;
        await attendance.save();
    }
    return attendance;
};