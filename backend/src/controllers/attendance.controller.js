//importing services
import {
  addAttendanceService,
  deleteAttendanceService,
  getAttendanceService,
} from "../services/attendance.service.js";
//importing utils
import { getVerificationCode } from "../utils/generateOTP.js";
import { findSubjectByName } from "../dao/subject.dao.js";
import { findStudentByRollNo } from "../dao/student.dao.js";
import { findAttendance } from "../dao/attendance.dao.js";

export const addAttendance = async (req, res) => {
  try {
    const getSubjectName = getVerificationCode(req.body.otp);
    // If the OTP is invalid, getVerificationCode will return undefined
    // If the OTP is valid, it will return the subject name associated with that OTP
    if (getSubjectName === undefined) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    const subjectId = await findSubjectByName(getSubjectName);
    const { studentId, isPresent = false } = req.body;
    const today = new Date();
    const yyyyMmDd = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    const isAttendanceExists = await findAttendance(
      studentId,
      yyyyMmDd,
      subjectId
    );
    if (isAttendanceExists) {
      return res.status(400).json({
        message: "Attendance already exists for the given student and subject",
      });
    }
    const attendance = await addAttendanceService({
      studentId,
      subjectId,
      isPresent,
    });
    res
      .status(201)
      .json({ message: "Attendance added successfully", attendance });
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAttendance = async (req, res) => {
  const { studentId, date, otp } = req.body;
  const subjectName = getVerificationCode(otp);
  const subjectId = await findSubjectByName(subjectName);
  await deleteAttendanceService(studentId, date, subjectId);
  res.status(200).json({ message: "Attendance deleted successfully" });
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
  const { rollNo, subjectName, isPresent = false } = req.body;
  const subjectId = await findSubjectByName(subjectName);

  if (!subjectId) {
    return res.status(404).json({ message: "Subject not found" });
  }

  const student = await findStudentByRollNo(rollNo);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const today = new Date();
  const yyyyMmDd = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  const isAttendanceExists = await findAttendance(
    student._id,
    yyyyMmDd,
    subjectId
  );
  if (isAttendanceExists) {
    return res.status(400).json({
      message: "Attendance already exists for the given student and subject",
    });
  }

  const attendance = await addAttendanceService({
    studentId: student._id,
    subjectId,
    isPresent,
  });
  res
    .status(201)
    .json({ message: "Attendance added successfully by teacher", attendance });
};
