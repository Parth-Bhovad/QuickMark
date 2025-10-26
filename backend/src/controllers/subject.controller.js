//importing services
import { createSubjectService, getAvailableSubjectsService } from '../services/subject.service.js';

export const createSubject = async (req, res) => {
    const { subjectName, teacherId } = req.body;
        await createSubjectService(subjectName, teacherId);
        res.sendStatus(201);
}

export const getAvailableSubjects = async (req, res) => {
        const availableSubjects = await getAvailableSubjectsService();
        res.status(200).json({ availableSubjects });
};