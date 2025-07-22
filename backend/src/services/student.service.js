import { findStudentByRollNo, findStudentById, deleteStudentByRollNo, addSubjectToStudent, findStudentByEmail, changeStudentPassword } from "../dao/student.dao.js";
import { findSubjectById, findSubjectByName } from "../dao/subject.dao.js";
//importing Express Error
import ExpressError from "../utils/ExpressError.js";
//importing hashPassword utility
import { hashPassword } from '../utils/helper.js';

export const getStudentService = async (studentId) => {
    const student = await findStudentById(studentId);
    if (!student) {
        throw new ExpressError(404, `Student with ID: ${studentId} not found`);
    }
    const subjectsNameArray = await getStudentSubjectsService(student._id);
    return { studentName: student.studentName, subjects: subjectsNameArray, rollNo: student.rollNo };
};

export const deleteStudentService = async (rollNo) => {
    const student = await findStudentByRollNo(rollNo);
    if (!student) {
        throw new ExpressError(404, `Student with Roll No: ${rollNo} not found`);
    }
    await deleteStudentByRollNo(rollNo);
    return student;
}

export const addSubjectToStudentService = async (studentId, subjectName) => {
    const student = await findStudentById(studentId);
    if (!student) {
        throw new ExpressError(404, `Student with ID: ${studentId} not found`);
    }
    const subject = await findSubjectByName(subjectName);
    if (!subject) {
        throw new ExpressError(404, `Subject with name: ${subjectName} not found`);
    }
    if (student.subjects.includes(subject._id)) {
        throw new ExpressError(400, `Subject ${subjectName} is already added to student ${student.studentName}`);
    }
    await addSubjectToStudent(studentId, subjectName);
    return student;
}

export const getStudentSubjectsService = async (studentId) => {
    const student = await findStudentById(studentId);
    if (!student) {
        throw new ExpressError(404, `Student with ID: ${studentId} not found`);
    }
    const subjectsNameArray = [];
    for (let i = 0; i < student.subjects.length; i++) {
        const subjectId = student.subjects[i];
        const subjectName = await findSubjectById(subjectId);
        subjectsNameArray.push(subjectName);
    }
    return subjectsNameArray;
}

export const studentForgotPasswordService = async (studentEmail, newPassword) => {
    const student = await findStudentByEmail(studentEmail);
    if (!student) {
        throw new ExpressError(404, `Student with email: ${studentEmail} not found`);
    }
    // Hash the password
    newPassword = await hashPassword(newPassword);
    changeStudentPassword(student, newPassword);
    return { message: "Password reset successfully" };
}