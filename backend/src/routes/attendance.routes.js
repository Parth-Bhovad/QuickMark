import { Router } from 'express';
//importing controllers
import { addAttendance, deleteAttendance, getAttendance } from '../controllers/attendance.controller.js';
//importing utils
import { generateOTP, storeVerificationCode } from '../utils/generateOTP.js';
//importing custom error classes
import ExpressError from '../utils/ExpressError.js';
//importing wrapAsync utility
import wrapAsync from '../utils/wrapAsync.js';
//importing middlewares
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isTeacher from '../middlewares/isTeacher.js';
const attendanceRouter = Router({ mergeParams: true });

attendanceRouter.get('/check-active-session', isLoggedIn, (req, res) => {
    if (attendanceRouter.otpActive) {
        // If OTP is already active, return an error
        console.log("OTP already active. Please wait until it expires.");
        throw new ExpressError(429, "OTP already active. Please wait until it expires.");
    } else {
        console.log("No active OTP session.");
        res.status(200).json({ message: "No active OTP session." });
    }
});
attendanceRouter.post('/', isLoggedIn, wrapAsync(addAttendance));
attendanceRouter.get('/otp', isLoggedIn, (req, res) => {
    // Store OTP generation state in memory (simple implementation)
    if (attendanceRouter.otpActive) {
        // If OTP is already active, return an error
        console.log("OTP already active. Please wait until it expires.");
        throw new ExpressError(429, "OTP already active. Please wait until it expires.");
    }
    attendanceRouter.otpActive = true;
    setTimeout(() => {
        attendanceRouter.otpActive = false;
    }, 60 * 1000); // 1 minute

    const otp = generateOTP();
    console.log("OTP Generated", otp);

    storeVerificationCode(otp, req.query.subjectName, 60 * 1000); // Store OTP with a 1-minute expiry
    res.json({ otp });
});
attendanceRouter.delete('/', isLoggedIn, wrapAsync(deleteAttendance));
attendanceRouter.get('/:subjectName', isLoggedIn, isTeacher, wrapAsync(getAttendance));

export default attendanceRouter;