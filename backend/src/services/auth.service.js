import bcrypt from 'bcrypt';
//importing helpers
import { signJWT, checkExistingStudent, checkExistingTeacher } from '../utils/helper.js';
//importing utils
import { generateOTP, storeVerificationCode, getVerificationCode } from '../utils/generateOTP.js';
//importing DAOs
import { createStudent, findStudentByEmail } from '../dao/student.dao.js';
import { createTeacher, findTeacherByEmail } from "../dao/teacher.dao.js";
//importing transporter for sending emails
import transporter from '../config/nodeMailer.config.js';

export const registerStudentService = async (studentName, rollNo, studentEmail, studentPassword) => {
  // Check if student already exists
  await checkExistingStudent(studentEmail);

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  studentPassword = await bcrypt.hash(studentPassword, salt);

  const newStudent = await createStudent(studentName, rollNo, studentEmail, studentPassword);

  // Generate JWT token
  const token = signJWT(newStudent._id);

  return { student: newStudent, token };
}

export const loginStudentService = async (studentEmail, studentPassword) => {
  console.log(studentEmail, studentPassword);

  const student = await findStudentByEmail(studentEmail);
  if (!student) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(studentPassword, student.studentPassword);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = signJWT(student._id);
  return { student, token };
}

export const registerTeacherService = async (teacherName, teacherEmail, teacherPassword) => {
  // Check if teacher already exists
  await checkExistingTeacher(teacherEmail);

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  teacherPassword = await bcrypt.hash(teacherPassword, salt);

  const newTeacher = await createTeacher(teacherName, teacherEmail, teacherPassword);

  // Generate JWT token
  const token = signJWT(newTeacher._id);

  return { teacher: newTeacher, token };
}

export const loginTeacherService = async (teacherEmail, teacherPassword) => {
  const teacher = await findTeacherByEmail(teacherEmail);
  if (!teacher) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(teacherPassword, teacher.teacherPassword);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = signJWT(teacher._id);
  return { teacher, token };
}

export const sendOTPEmailService = async (userEmail) => {
  const otp = generateOTP();
  storeVerificationCode(userEmail, otp);

  const mailOptions = {
    from: '"OTP Service" <' + process.env.MY_EMAIL + '>',
    to: userEmail,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`,
    html: `<p>Your OTP is <b>${otp}</b></p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return otp; // Return it to store/verify on server side
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export const verifyOTPService = async (email, otp) => {
  const storedOtp = getVerificationCode(email);
  if (!storedOtp) {
    throw new Error("OTP not found or expired");
  }

  return storedOtp === otp ? true : false;
}