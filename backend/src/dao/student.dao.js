//importing models
import Student from '../models/Student.model.js';
import { findSubjectByName } from './subject.dao.js';

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

export const deleteStudentByRollNo = async (rollNo) => {
    const student = await Student.findOneAndDelete({ rollNo });
    return student;
}

export const addSubjectToStudent = async (studentId, subjectName) => {
    console.log(`Adding subject ${subjectName} to student with ID ${studentId}`);
    
    const subject = await findSubjectByName(subjectName);
    const student = await findStudentById(studentId);
    student.subjects.push(subject._id);
    await student.save();
    return student;
}