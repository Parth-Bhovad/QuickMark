//importing model
import Subject from '../models/Subject.model.js';

export const createSubject = async (subjectName, teacherId) => {
    const newSubject = new Subject({ subjectName, teacherId });
    await newSubject.save();
    return newSubject;
}

export const findSubjectByName = async (subjectName) => {
    const subject = await Subject.findOne({ subjectName });
    return subject;
}

export const findSubjectById = async (subjectId) => {
    const {subjectName} = await Subject.findById(subjectId);
    return subjectName;
}