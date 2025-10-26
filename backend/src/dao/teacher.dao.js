//importing models
import Teacher from '../models/Teacher.model.js';

export const createTeacher = async (teacherName, teacherEmail, teacherPassword) => {
    const newTeacher = new Teacher({ teacherName, teacherEmail, teacherPassword });
    await newTeacher.save();
    return newTeacher;
}

export const findTeacherById = async (teacherId) => {
    const teacher = await Teacher.findById(teacherId);
    return teacher;
}

export const findTeacherByEmail = async (teacherEmail) => {
    const teacher = await Teacher.findOne({ teacherEmail });
    return teacher;
}

export const deleteTeacherById = async (teacherId) => {
    const teacher = await Teacher.findByIdAndDelete(teacherId);
    return teacher;
}

export const addSubjectToTeacher = async (teacherId, subjectId) => {
    const teacher = await findTeacherById(teacherId);
    teacher.subjects.push(subjectId);
    await teacher.save();
    return teacher;
}

export const removeSubjectFromTeacher = async (teacherId, subjectId) => {
    const teacher = await findTeacherById(teacherId);
    teacher.subjects = teacher.subjects.filter(subjId => subjId.toString() !== subjectId.toString());
    await teacher.save();
    return teacher;
}

export const changeTeacherPassword = async (teacher, newPassword) => {
    teacher.teacherPassword = newPassword;
    await teacher.save();
    return teacher;
}