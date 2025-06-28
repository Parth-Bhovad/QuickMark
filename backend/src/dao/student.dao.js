//importing models
import Student from '../models/Student.model.js';

export const createStudent = async (studentName, rollNo, studentEmail, studentPassword) => {
    const newStudent = new Student({ studentName, rollNo, studentEmail, studentPassword });
    await newStudent.save();
    return newStudent;
}

export const findStudentByEmail = async (studentEmail) => {
    const student = await Student.findOne({ studentEmail });
    return student;
}

export const findStudentById = async (studentId) => {
    const student = await Student.findById(studentId);
    return student;
}

export const findStudentByRollNo = async (rollNo) => {
    const student = await Student.findOne({ rollNo });
    return student;
}