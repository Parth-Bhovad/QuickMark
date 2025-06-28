import { findTeacherById, deleteTeacherById } from '../dao/teacher.dao.js';

export const getTeacherService = async (teacherId) => {
    const teacher = await findTeacherById(teacherId);
    if (!teacher) {
        throw new Error(`Teacher with ID: ${teacherId} not found`);
    }
    return teacher;
}

export const deleteTeacherService = async (teacherId) => {
    const teacher = await findTeacherById(teacherId);
    if (!teacher) {
        throw new Error(`Teacher with ID: ${teacherId} not found`);
    }
    await deleteTeacherById(teacherId);
    return teacher;
}