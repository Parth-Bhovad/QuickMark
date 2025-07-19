//importing services
import { createSubjectService, getAvailableSubjectsService } from '../services/subject.service.js';

export const createSubject = async (req, res) => {
    const { subjectName, teacherId } = req.body;
        const newSubject = await createSubjectService(subjectName, teacherId);
        res.status(201).json(newSubject);
}

export const getAvailableSubjects = async (req, res) => {
        const availableSubjects = await getAvailableSubjectsService();
        res.status(200).json({ availableSubjects });
};