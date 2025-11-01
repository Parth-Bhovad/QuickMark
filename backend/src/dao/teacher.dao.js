//importing models
import Teacher from '../models/Teacher.model.js';

export const createTeacher = async (teacherName, teacherEmail, teacherPassword) => {
    await Teacher.create({ teacherName, teacherEmail, teacherPassword });
}

export const checkExistingTeacher = async (teacherEmail) => {
    // Check if teacher already exists
    const existingTeacher = await Teacher.exists({ teacherEmail });
    return !!existingTeacher;
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
    await Teacher.findByIdAndDelete(teacherId);
}

export const addSubjectToTeacher = async (teacher, subjectId) => {
    teacher.subjects.push(subjectId);
    await teacher.save();
}

export const removeSubjectFromTeacher = async (teacher, subjectId) => {
    teacher.subjects = teacher.subjects.filter(subjId => subjId.toString() !== subjectId.toString());
    await teacher.save();
    return teacher;
}

export const changeTeacherPassword = async (teacher, newPassword) => {
    teacher.teacherPassword = newPassword;
    await teacher.save();
    return teacher;
}