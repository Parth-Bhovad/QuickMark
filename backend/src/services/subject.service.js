//importing DAOs
import { createSubject } from '../dao/subject.dao.js';

export const createSubjectService = async (subjectName, teacherId) => {
    const newSubject = await createSubject(subjectName, teacherId);
    return newSubject;
}