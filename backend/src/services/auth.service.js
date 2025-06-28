import bcrypt from 'bcrypt';
//importing helpers
import { signJWT, checkExistingStudent, checkExistingTeacher } from '../utils/helper.js';
//importing DAOs
import { createStudent, findStudentByEmail } from '../dao/student.dao.js';
import { createTeacher, findTeacherByEmail } from "../dao/teacher.dao.js";

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