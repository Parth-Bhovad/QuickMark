import bcrypt from 'bcrypt';
//importing helpers
import { createStudent, findStudentByEmail } from '../dao/student.dao.js';
import { signJWT, checkExistingStudent } from '../utils/helper.js';

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