import bcrypt from 'bcrypt';
//importing helpers
import { createStudent } from '../dao/student.dao.js';
import { signJWT, checkExistingUser } from '../utils/helper.js';

export const registerStudentService = async (studentName, rollNo, studentEmail, password) => {
    // Check if user already exists
    await checkExistingUser(studentEmail);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const newStudent = await createStudent(studentName, rollNo, studentEmail, password);

    // Generate JWT token
    const token = signJWT(newStudent._id);

    return { student: newStudent, token };
}