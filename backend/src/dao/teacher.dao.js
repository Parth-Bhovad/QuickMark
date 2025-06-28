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