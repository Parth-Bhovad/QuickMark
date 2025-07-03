import bcrypt from 'bcrypt';
//importing helpers
import { signJWT, checkExistingStudent, checkExistingTeacher, hashPassword } from '../utils/helper.js';
//importing utils
import { generateOTP, storeVerificationCode, getVerificationCode } from '../utils/generateOTP.js';
//importing DAOs
import { createStudent } from '../dao/student.dao.js';
import { createTeacher, findTeacherByEmail } from "../dao/teacher.dao.js";
//importing transporter for sending emails
import transporter from '../config/nodeMailer.config.js';
//importing custom error class
import ExpressError from '../utils/ExpressError.js';

export const registerStudentService = async (studentName, rollNo, studentEmail, studentPassword) => {
  // Check if student already exists
  const existingStudent = await checkExistingStudent(studentEmail);

  if (existingStudent) {
    throw new ExpressError(400, "Student already exists");
  }

  // Hash the password
  studentPassword = await hashPassword(studentPassword);

  const newStudent = await createStudent(studentName, rollNo, studentEmail, studentPassword);

  // Generate JWT token
  const token = signJWT(newStudent._id);

  return { token };
}

export const loginStudentService = async (studentEmail, studentPassword) => {
  // Check if student already exists
  const existingStudent = await checkExistingStudent(studentEmail);
  if (!existingStudent) {
    throw new ExpressError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(studentPassword, student.studentPassword);
  if (!isMatch) {
    throw new ExpressError(401, "Invalid email or password");
  }

  const token = signJWT(student._id);
  return { token };
}

export const registerTeacherService = async (teacherName, teacherEmail, teacherPassword) => {
  // Check if teacher already exists
  await checkExistingTeacher(teacherEmail);

  // Hash the password
  teacherPassword = await hashPassword(teacherPassword);

  const newTeacher = await createTeacher(teacherName, teacherEmail, teacherPassword);

  // Generate JWT token
  const token = signJWT(newTeacher._id);

  return { token };
}

export const loginTeacherService = async (teacherEmail, teacherPassword) => {
  const teacher = await findTeacherByEmail(teacherEmail);
  if (!teacher) {
    throw new ExpressError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(teacherPassword, teacher.teacherPassword);
  if (!isMatch) {
    throw new ExpressError(401, "Invalid email or password");
  }

  const token = signJWT(teacher._id);
  return { token };
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

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return otp;
};

export const verifyOTPService = async (email, otp) => {
  const storedOtp = getVerificationCode(email);
  return storedOtp === otp ? true : false;
};