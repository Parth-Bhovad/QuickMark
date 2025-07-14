import ExpressError from '../utils/ExpressError.js';
import {deleteTeacherService, getTeacherService, addSubjectToTeacherService,getTeacherSubjectsService } from '../services/teacher.service.js';

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

export const getTeacherSubjects = async (req, res) => {
        const teacherId = req.params.teacherId;
        const subjectsNameArray = await getTeacherSubjectsService(teacherId);

        if (!subjectsNameArray || subjectsNameArray.length === 0) {
            throw new ExpressError(404, `Subjects not found`);
        }
        res.status(200).json({ subjects: subjectsNameArray });
}