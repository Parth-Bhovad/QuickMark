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