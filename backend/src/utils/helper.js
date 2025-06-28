import { findStudentByEmail } from '../dao/student.dao.js';
import jwt from 'jsonwebtoken';

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
