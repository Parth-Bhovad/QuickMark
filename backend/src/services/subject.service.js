//importing DAOs
import { createSubject,getAvailableSubjects } from '../dao/subject.dao.js';
//importing Express Error Handler
import ExpressError from '../utils/ExpressError.js';

export const createSubjectService = async (subjectName, teacherId) => {
    const existingSubject = await findSubjectByName(subjectName);
    if (existingSubject) {
        throw new ExpressError(400, "Subject already exists");
    }
    const newSubject = await createSubject(subjectName, teacherId);
    return newSubject;
}

export const getAvailableSubjectsService = async () => {
    const availableSubjects = await getAvailableSubjects();
    if (availableSubjects.length > 0) {
        return availableSubjects;
    }
    throw new ExpressError(404, "No available subjects found");
}