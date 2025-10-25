//importing dao
import {
  addAttendance,
  findAttendance,
  deleteAttendance,
  findAllAttendanceBySubject,
  addInitialAttendance,
  findAttendanceAndMarkPresent
} from "../dao/attendance.dao.js";

import {
  findStudentsById,
  findStudentsBySubjectId,
  findStudentByRollNo
} from "../dao/student.dao.js";

import { findSubjectByName, findSubjectsById } from "../dao/subject.dao.js";

//importing utils
import { getVerificationCode } from "../utils/generateOTP.js";

//importing custom error classes
import ExpressError from "../utils/ExpressError.js";

export const addAttendanceService = async (studentId, otp) => {
  const getSubjectName = getVerificationCode(otp);
  // If the OTP is invalid, getVerificationCode will return undefined
  // If the OTP is valid, it will return the subject name associated with that OTP
  if (getSubjectName === undefined) {
    throw new ExpressError(500, "Invalid OTP");
  }
  const subject = await findSubjectByName(getSubjectName);
  const today = new Date();
  const yyyyMmDd = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'

  findAttendanceAndMarkPresent(studentId, yyyyMmDd, subject._id);

  return;
};

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
    throw new ExpressError(
      404,
      "Attendance not found for the given student ID"
    );
  }
  await deleteAttendance(attendance._id);
  return { message: "Attendance deleted successfully" };
};

export const getAttendanceService = async (subjectName) => {
  if (!subjectName) {
    throw new ExpressError(400, "Subject Name is required to get attendance");
  }
  console.log("Subject Name:", subjectName);
  const subject = await findSubjectByName(subjectName);
  console.log("Subject:", subject);

  const attendance = await findAllAttendanceBySubject(subject._id);
  if (!attendance) {
    throw new ExpressError(
      404,
      "Attendance not found for the given subject ID"
    );
  }
  const studentIdSet = new Set(attendance.map((a) => a.studentId.toString()));
  const subjectIdSet = new Set(attendance.map((a) => a.subjectId.toString()));
  const students = await findStudentsById(Array.from(studentIdSet));
  const subjects = await findSubjectsById(Array.from(subjectIdSet));
  console.log("Students Id:", Array.from(studentIdSet));
  console.log("Subjects Id:", Array.from(subjectIdSet));
  // console.log("Students name:", students.map(s => s.studentName));
  // console.log("Subjects name:", subjects.map(s => s.subjectName));
  const studentNamesMap = new Map(
    students.map((s) => [s._id.toString(), s.studentName])
  );
  const subjectNamesMap = new Map(
    subjects.map((s) => [s._id.toString(), s.subjectName])
  );
  const studentRollNoMap = new Map(
    students.map((s) => [s._id.toString(), s.rollNo])
  );
  console.log("Student Map:", studentNamesMap);
  console.log("Subject Map:", subjectNamesMap);

  // attendance.forEach(a => {
  //     a.studentName = studentMap.get(a.studentId.toString());
  //     a.subjectName = subjectMap.get(a.subjectId.toString());
  // });

  const updatedAttendance = attendance.map((a) => ({
    isPresent: a.isPresent,
    day: a.day,
    date: a.date,
    studentName: studentNamesMap.get(a.studentId.toString()),
    subjectName: subjectNamesMap.get(a.subjectId.toString()),
    rollNo: studentRollNoMap.get(a.studentId.toString()),
  }));
  return updatedAttendance;
};

export const addInitialAttendanceService = async (otp) => {
  const getSubjectName = getVerificationCode(otp);
  // If the OTP is invalid, getVerificationCode will return undefined
  // If the OTP is valid, it will return the subject name associated with that OTP
  if (getSubjectName === undefined) {
    throw new ExpressError(404, "Invalid OTP");
  }

  const subjectId = await findSubjectByName(getSubjectName);

  const students = await findStudentsBySubjectId(subjectId);
  const today = new Date();
  const yyyyMmDd = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'

  const initialAttendanceData = students.map((student) => ({
    studentId: student._id,
    subjectId,
    date: yyyyMmDd,
    isPresent: false,
  }));
  await addInitialAttendance(initialAttendanceData);
  return;
};

export const addAttendanceByTeacherService = async (rollNo, subjectId) => {
  const student = await findStudentByRollNo(rollNo);
  if (!student) {
    throw new ExpressError(404, "Student not found with the given roll number");
  }
  const today = new Date();
  const yyyyMmDd = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  const isAttendanceExists = await findAttendance(
    student._id,
    yyyyMmDd,
    subjectId
  );
  if (isAttendanceExists) {
    throw new ExpressError(400, "Attendance already exists for the given student and subject");
  }
  await addAttendance({
    studentId: student._id,
    subjectId,
    date: yyyyMmDd,
    isPresent: false,
  });
};
