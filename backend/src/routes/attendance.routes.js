import { Router } from 'express';
//importing controllers
import { addAttendance } from '../controllers/attendance.controller.js';
const attendanceRouter = Router({ mergeParams: true });

attendanceRouter.post('/', addAttendance);

export default attendanceRouter;