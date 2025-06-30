//importing services
import { createSubjectService } from '../services/subject.service.js';

export const createSubject = async (req, res) => {
    const { subjectName, teacherId } = req.body;
    try {
        const newSubject = await createSubjectService(subjectName, teacherId);
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}