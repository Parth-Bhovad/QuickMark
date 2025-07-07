import { Router } from 'express';
//importing controllers
import { addAttendance } from '../controllers/attendance.controller.js';
//importing utils
import {generateOTP, storeVerificationCode} from '../utils/generateOTP.js';
const attendanceRouter = Router({ mergeParams: true });

attendanceRouter.post('/', addAttendance);
attendanceRouter.get('/otp', (req, res) => {
    const otp = generateOTP();
    console.log("OTP Generated", otp);
    
    storeVerificationCode(otp, req.query.subjectName);
    res.json({ otp });
});

export default attendanceRouter;