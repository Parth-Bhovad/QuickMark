import jwt from 'jsonwebtoken';
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
    if (existingStudent) {
        throw new Error("Student already exists");
    }
}

export const checkExistingTeacher = async (teacherEmail) => {
    // Check if teacher already exists
    const existingTeacher = await findTeacherByEmail(teacherEmail);
    if (existingTeacher) {
        throw new Error("Teacher already exists");
    }
}
