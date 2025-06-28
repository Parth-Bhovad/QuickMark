import {deleteTeacherService, getTeacherService} from '../services/teacher.service.js';

export const getTeacher = async (req, res) => {
    let teacherId = req.params.teacherId;
    console.log("Get teacher route", teacherId);

    const teacher = await getTeacherService(teacherId);

    res.status(200).json({ teacher });
};

export const deleteTeacher = async (req, res) => {
    let teacherId = req.params.teacherId;
    const deletedTeacher = await deleteTeacherService(teacherId);
    res.status(200).json({ teacher: deletedTeacher });
};