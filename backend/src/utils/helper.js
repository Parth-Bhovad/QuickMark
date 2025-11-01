import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//importing DAOs
import { findStudentByEmail } from '../dao/student.dao.js';
import { findTeacherByEmail } from '../dao/teacher.dao.js';

export const signJWT = (userId, role) => {
    // Generate JWT token
    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
        expiresIn: "2d"
    });
    return token;
}

// export const checkExistingStudent = async (studentEmail) => {
//     // Check if student already exists
//     const existingStudent = await findStudentByEmail(studentEmail);
//     return existingStudent;
// }

// export const checkExistingTeacher = async (teacherEmail) => {
//     // Check if teacher already exists
//     const existingTeacher = await findTeacherByEmail(teacherEmail);
//     return existingTeacher;
// }

export const hashPassword = async (password) => {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}