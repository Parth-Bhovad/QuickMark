import { findTeacherById, deleteTeacherById, addSubjectToTeacher, changeTeacherPassword, findTeacherByEmail } from '../dao/teacher.dao.js';
import { findSubjectByName, findSubjectById } from '../dao/subject.dao.js';
import { createSubject } from '../dao/subject.dao.js';
//import Express Error
import ExpressError from '../utils/ExpressError.js';
//importing hashPassword utility
import { hashPassword } from '../utils/helper.js';

export const getTeacherService = async (teacherId) => {
    const teacher = await findTeacherById(teacherId);
    if (!teacher) {
        throw new ExpressError(404, `Teacher with ID: ${teacherId} not found`);
    }
    const subjectsNameArray = await getTeacherSubjectsService(teacherId);
    return { teacherName: teacher.teacherName, subjects: subjectsNameArray };
}

export const deleteTeacherService = async (teacherId) => {
    const teacher = await findTeacherById(teacherId);
    if (!teacher) {
        throw new ExpressError(404, `Teacher with ID: ${teacherId} not found`);
    }
    await deleteTeacherById(teacherId);
}

export const addSubjectToTeacherService = async (subjectName, teacherId) => {
    let subject = await findSubjectByName(subjectName);
    //check if the subject already exists
    if (!subject) {
        subject = await createSubject(subjectName, teacherId);
    }
    const teacher = await findTeacherById(teacherId);
    if (teacher.subjects && teacher.subjects.includes(subject._id)) {
        throw new ExpressError(400, `Subject ${subjectName} already exists for teacher`);
    }

    await addSubjectToTeacher(teacherId, subject._id);
    return subject;
}

export const getTeacherSubjectsService = async (teacherId) => {
    const teacher = await findTeacherById(teacherId);
    if (!teacher) {
        throw new ExpressError(404, `Teacher with ID: ${teacherId} not found`);
    }
    const subjectsNameArray = [];
    if (teacher?.subjects && teacher?.subjects?.length > 0) {
        for (let i = 0; i < teacher.subjects.length; i++) {
            const subjectId = teacher.subjects[i];
            const subjectName = await findSubjectById(subjectId);
            subjectsNameArray.push(subjectName);
        }
    }

    return subjectsNameArray;
}

export const teacherForgotPasswordService = async (teacherEmail, newPassword) => {
    const teacher = await findTeacherByEmail(teacherEmail);
    if (!teacher) {
        throw new ExpressError(404, `Teacher with email: ${teacherEmail} not found`);
    }
    // Hash the password
    newPassword = await hashPassword(newPassword);
    changeTeacherPassword(teacher, newPassword);
}