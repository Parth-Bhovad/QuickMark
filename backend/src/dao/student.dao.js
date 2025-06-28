//importing models
import Student from '../models/Student.model.js';

export const createStudent = async (studentName, rollNo, studentEmail, password) => {
    const newStudent = new Student({ studentName, rollNo, studentEmail, password });
    await newStudent.save();
    return newStudent;
}

export const findStudentByEmail = async (studentEmail) => {
    const student = await Student.findOne({ studentEmail });
    return student;
}