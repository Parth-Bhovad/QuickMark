//importing models
import Student from '../models/Student.model.js';

export const createStudent = async (studentName, rollNo, studentEmail, studentPassword) => {
    const student = await Student.create({ studentName, rollNo, studentEmail, studentPassword });
    return student;
}

export const checkExistingStudent = async (studentEmail) => {
    // Check if student already exists
    const existingStudent = await Student.exists({ studentEmail });
    return !!existingStudent;
}

export const findStudentByEmail = async (studentEmail) => {
    const student = await Student.findOne({ studentEmail });
    return student;
}

export const findStudentById = async (studentId) => {
    const student = await Student.findById(studentId);
    return student;
}

export const findStudentsById = async (studentIds) => {
    const students = await Student.find({ _id: { $in: studentIds } });
    return students;
}

export const findStudentByRollNo = async (rollNo) => {
    const student = await Student.findOne({ rollNo });
    return student;
}

export const deleteStudentByRollNo = async (rollNo) => {
    await Student.findOneAndDelete({ rollNo });
}

export const findStudentsBySubjectId = async (subjectId) => {
    const students = await Student.find({ subjects: subjectId });
    return students;
}

export const editStudentSubject = async (studentId, ids) => {
    await Student.findByIdAndUpdate(studentId, { subjects: ids });
}
    
export const changeStudentPassword = async (student, newPassword) => {
    student.studentPassword = newPassword;
    await student.save();
}