import { findStudentByRollNo,findStudentById, deleteStudentByRollNo, addSubjectToStudent } from "../dao/student.dao.js";

export const getStudentService = async (rollNo) => {
    const student = await findStudentByRollNo(rollNo);
    if (!student) {
        throw new Error(`Student with Roll No: ${rollNo} not found`);
    }
    return student;
}

export const deleteStudentService = async (rollNo) => {
    const student = await findStudentByRollNo(rollNo);
    if (!student) {
        throw new Error(`Student with Roll No: ${rollNo} not found`);
    }
    await deleteStudentByRollNo(rollNo);
    return student;
}

export const addSubjectToStudentService = async (studentId, subjectName) => {
    const student = await findStudentById(studentId);
    if (!student) {
        throw new Error(`Student with ID: ${studentId} not found`);
    }
    await addSubjectToStudent(studentId, subjectName);
    return student;
}
