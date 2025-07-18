import { findTeacherById, deleteTeacherById, addSubjectToTeacher } from '../dao/teacher.dao.js';
import { findSubjectByName, findSubjectById } from '../dao/subject.dao.js';
import { createSubject } from '../dao/subject.dao.js';

export const getTeacherService = async (teacherId) => {
    const teacher = await findTeacherById(teacherId);
    if (!teacher) {
        throw new Error(`Teacher with ID: ${teacherId} not found`);
    }
    const subjectsNameArray = await getTeacherSubjectsService(teacherId);
    return { teacherName: teacher.teacherName, subjects: subjectsNameArray };
}

export const deleteTeacherService = async (teacherId) => {
    const teacher = await findTeacherById(teacherId);
    if (!teacher) {
        throw new Error(`Teacher with ID: ${teacherId} not found`);
    }
    await deleteTeacherById(teacherId);
    return teacher;
}

export const addSubjectToTeacherService = async (subjectName, teacherId) => {
    //check if the subject already exists
    let subject = await findSubjectByName(subjectName);
    if (!subject) {
        subject = await createSubject(subjectName, teacherId);
    }

    await addSubjectToTeacher(teacherId, subject._id);
    return subject;
}

export const getTeacherSubjectsService = async (teacherId) => {
    const teacher = await findTeacherById(teacherId);
    if (!teacher) {
        throw new Error(404, `Teacher with ID: ${teacherId} not found`);
    }
    const subjectsNameArray=[];
    for (let i = 0; i < teacher.subjects.length; i++) {
        const subjectId = teacher.subjects[i];
        const subjectName = await findSubjectById(subjectId);
        subjectsNameArray.push(subjectName);
    }
    return subjectsNameArray;
}