import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//importing DAOs
import { findStudentByEmail } from '../dao/student.dao.js';
import { findTeacherByEmail } from '../dao/teacher.dao.js';

export const signJWT = (studentId) => {
    // Generate JWT token
    const token = jwt.sign({ id: studentId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    return token;
}

export const checkExistingStudent = async (studentEmail) => {
    // Check if student already exists
    const existingStudent = await findStudentByEmail(studentEmail);
    return existingStudent;
}

export const checkExistingTeacher = async (teacherEmail) => {
    // Check if teacher already exists
    const existingTeacher = await findTeacherByEmail(teacherEmail);
    return existingTeacher;
}

export const hashPassword = async (password) => {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}