import {deleteTeacherService, getTeacherService, addSubjectToTeacherService } from '../services/teacher.service.js';

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

export const addSubjectToTeacher = async (req, res) => {
    try {
        const { subjectName } = req.body;
        const teacherId = req.params.teacherId;
        await addSubjectToTeacherService(subjectName, teacherId);
        res.status(200).json({ message: "Subject added to teacher successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}