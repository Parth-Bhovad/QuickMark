import { findStudentByRollNo, findStudentById, findStudentsPaginated, deleteStudentByRollNo, editStudentSubject, findStudentByEmail, changeStudentPassword } from "../dao/student.dao.js";
import { findSubjectById, findSubjectByName, findSubjectsByNames } from "../dao/subject.dao.js";
//importing Express Error
import ExpressError from "../utils/ExpressError.js";
//importing hashPassword utility
import { hashPassword } from '../utils/helper.js';

export const getStudentService = async (studentId) => {
    const student = await findStudentById(studentId);
    if (!student) {
        throw new ExpressError(404, `Student with ID: ${studentId} not found`);
    }
    const subjectsNameArray = await getStudentSubjectsService(student);
    return { studentName: student.studentName, subjects: subjectsNameArray, rollNo: student.rollNo };
};

export const getStudentsService = async (page = 1) => {
    const pageSize = 10;
    const currentPage = Math.max(Number.parseInt(page, 10) || 1, 1);
    const { students, totalStudents } = await findStudentsPaginated(
        (currentPage - 1) * pageSize,
        pageSize,
    );

    return {
        students,
        page: currentPage,
        limit: pageSize,
        totalStudents,
        totalPages: Math.ceil(totalStudents / pageSize),
    };
};

export const deleteStudentService = async (rollNo) => {
    await deleteStudentByRollNo(rollNo);
}

export const editStudentSubjectService = async (studentId, subjectNames) => {
    const subjects = await findSubjectsByNames(subjectNames);
    if (subjectNames.length > 0) {
        const ids = subjects.map(subject => subject._id);
        await editStudentSubject(studentId, ids);
    } else {
        await editStudentSubject(studentId, []);
    }
}

export const getStudentSubjectsService = async (student) => {
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
}