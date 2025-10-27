//importing model
import Subject from '../models/Subject.model.js';

export const createSubject = async (subjectName, teacherId) => {
    const newSubject = new Subject({ subjectName, teacherId });
    await newSubject.save();
}

export const findSubjectByName = async (subjectName) => {
    const subject = await Subject.findOne({ subjectName });
    return subject;
}

export const findSubjectById = async (subjectId) => {
    const {subjectName} = await Subject.findById(subjectId);
    return subjectName;
}

export const findSubjectsById = async (subjectIds) => {
    const subjects = await Subject.find({ _id: { $in: subjectIds } });
    return subjects;
}

export const getAvailableSubjects = async () => {
    const subjects = await Subject.find({});
    return subjects.map(subject => subject.subjectName);
}

export const addTeacherToSubject = async (subjectId, teacherId) => {
    const subject = await Subject.findById(subjectId);
    subject.teacherId = teacherId;
    await subject.save();
    return subject;
}

export const removeTeacherFromSubject = async (subjectId, teacherId) => {
    const subject = await Subject.findById(subjectId);
    if (subject.teacherId.toString() === teacherId.toString()) {
        subject.teacherId = null;
        await subject.save();
    }
    return subject;
}
