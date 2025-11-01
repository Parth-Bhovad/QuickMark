//importing services
import {
  addAttendanceService,
  deleteAttendanceService,
  getAttendanceService,
  addInitialAttendanceService,
  addAttendanceByTeacherService,
} from "../services/attendance.service.js";
//importing utils
import {
  getVerificationCode,
  generateAttendanceOTP,
  storeVerificationCode,
} from "../utils/generateOTP.js";
import { findSubjectByName } from "../dao/subject.dao.js";

export const addAttendance = async (req, res) => {
  const { studentId, otp } = req.body;
  await addAttendanceService(studentId, otp);
  res.sendStatus(201);
};

export const deleteAttendance = async (req, res) => {
  const { studentId, date, otp } = req.body;
  const subjectName = getVerificationCode(otp);
  const subject = await findSubjectByName(subjectName);
  await deleteAttendanceService(studentId, date, subject._id);
  res.sendStatus(200);
};

export const getAttendance = async (req, res) => {
  const { subjectName } = req.params;

  const attendance = await getAttendanceService(subjectName);
  if (!attendance) {
    return res.status(404).json({ message: "Attendance not found" });
  }
  res.status(200).json({ attendance });
};

export const addAttendanceByTeacher = async (req, res) => {
  const { rollNo, subjectName } = req.body;
  const subjectId = await findSubjectByName(subjectName);

  if (!subjectId) {
    return res.status(404).json({ message: "Subject not found" });
  }

  await addAttendanceByTeacherService(rollNo, subjectId);
  res.sendStatus(201);
};

export const getAttendanceOTP = (req, res) => {
  const otp = generateAttendanceOTP();
  storeVerificationCode(otp, req.query.subjectName, 30 * 1000); // Store OTP with a 30-second expiry
  addInitialAttendanceService(otp);
  res.json({ otp });
};
