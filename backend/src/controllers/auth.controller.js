//import necessary services
import { registerStudentService, loginStudentService, registerTeacherService, loginTeacherService, sendOTPEmailService, verifyOTPService } from '../services/auth.service.js';
import ExpressError from '../utils/ExpressError.js';
import jwt from 'jsonwebtoken';

export const registerStudent = async (req, res) => {
  let { studentName, rollNo, studentEmail, studentPassword } = req.body;
  const { token } = await registerStudentService(studentName, rollNo, studentEmail, studentPassword);
  res.cookie('token', token, {
    httpOnly: true,
  });
  res.status(201).json({ token });
}

export const loginStudent = async (req, res) => {
  let { studentEmail, studentPassword } = req.body;
  const { token } = await loginStudentService(studentEmail, studentPassword);
  res.cookie('token', token, {
    httpOnly: true,
  });
  res.status(200).json({ token });
}

export const registerTeacher = async (req, res) => {
  let { teacherName, teacherEmail, teacherPassword } = req.body;
  const { token } = await registerTeacherService(teacherName, teacherEmail, teacherPassword);
  res.cookie('token', token, {
    httpOnly: true,
  });
  res.status(201).json({ token });
}

export const loginTeacher = async (req, res) => {
  let { teacherEmail, teacherPassword } = req.body;
  const { token } = await loginTeacherService(teacherEmail, teacherPassword);
  res.cookie('token', token, {
    httpOnly: true,
  });
  res.status(200).json({ token });
}

export const sendOTPEmail = async (req, res) => {
  const { email } = req.body;
  const otp = await sendOTPEmailService(email);
  res.status(200).json({ message: 'OTP sent successfully' });
};

export const verifyOTPEmail = async (req, res) => {
  const { email, otp } = req.body;
  const isValid = await verifyOTPService(email, otp);
  if (isValid) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
};

export const authMe = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    throw new ExpressError(401, "Unauthorized");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) throw new ExpressError(401, "Unauthorized");
  res.status(200).json({ user: decoded });
};