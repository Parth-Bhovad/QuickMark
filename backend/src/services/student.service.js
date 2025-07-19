import { findStudentByRollNo,findStudentById, deleteStudentByRollNo, addSubjectToStudent } from "../dao/student.dao.js";
import { findSubjectById } from "../dao/subject.dao.js";

export const getStudentService = async (studentId) => {
    const student = await findStudentById(studentId);
    if (!student) {
        throw new Error(`Student with ID: ${studentId} not found`);
    }
    const subjectsNameArray = await getStudentSubjectsService(student._id);
    return { studentName: student.studentName, subjects: subjectsNameArray, rollNo: student.rollNo };
};

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

export const getStudentSubjectsService = async (studentId) => {
    const student = await findStudentById(studentId);
    if (!student) {
        throw new Error(`Student with ID: ${studentId} not found`);
    }
    const subjectsNameArray=[];
    for (let i = 0; i < student.subjects.length; i++) {
        const subjectId = student.subjects[i];
        const subjectName = await findSubjectById(subjectId);
        subjectsNameArray.push(subjectName);
    }
    return subjectsNameArray;
}