import {addAttendance, findAttendance, deleteAttendance} from "../dao/attendance.dao.js";
//importing custom error classes
import ExpressError from "../utils/ExpressError.js";

export const addAttendanceService = async (attendanceData) => {
    const attendance = await addAttendance(attendanceData);
    return attendance;
}

export const deleteAttendanceService = async (studentId, date, subjectId) => {
    if (!studentId) {
        throw new ExpressError(400, "Student ID are required to delete attendance");
    }
    if (!date) {
        throw new ExpressError(400, "Date is required to delete attendance");
    }
    if (!subjectId) {
        throw new ExpressError(400, "Subject ID is required to delete attendance");
    }
    const attendance = await findAttendance(studentId, date, subjectId);
    if (!attendance) {
        throw new ExpressError(404, "Attendance not found for the given student ID");
    }
    await deleteAttendance(attendance._id);
    return { message: "Attendance deleted successfully" };
}