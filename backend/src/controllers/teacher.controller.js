import ExpressError from '../utils/ExpressError.js';
import {deleteTeacherService, getTeacherService, addSubjectToTeacherService,getTeacherSubjectsService, teacherForgotPasswordService } from '../services/teacher.service.js';

export const getTeacher = async (req, res) => {
    let teacherId = req.params.teacherId;

    const { teacherName, subjects } = await getTeacherService(teacherId);

    res.status(200).json({ teacherName, subjects });
};

export const deleteTeacher = async (req, res) => {
    let teacherId = req.params.teacherId;
    await deleteTeacherService(teacherId);
    res.sendStatus(200);
};

export const addSubjectToTeacher = async (req, res) => {
        const { subjectName } = req.body;
        const teacherId = req.params.teacherId;
        await addSubjectToTeacherService(subjectName, teacherId);
        res.sendStatus(200);
}

export const getTeacherSubjects = async (req, res) => {
        const teacherId = req.params.teacherId;
        const subjectsNameArray = await getTeacherSubjectsService(teacherId);
        res.status(200).json({ subjects: subjectsNameArray });
}

export const teacherForgotPassword = async (req, res) => {
    let { teacherEmail, newPassword } = req.body;
    await teacherForgotPasswordService(teacherEmail, newPassword);
    res.sendStatus(200);
}