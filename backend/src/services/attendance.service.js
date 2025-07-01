import {addAttendance} from "../dao/attendance.dao.js";

export const addAttendanceService = async (attendanceData) => {
    const attendance = await addAttendance(attendanceData);
    return attendance;
}