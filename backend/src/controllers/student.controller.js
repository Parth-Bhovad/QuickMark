//importing services
import { getStudentService, deleteStudentService, editStudentSubjectService, studentForgotPasswordService } from '../services/student.service.js';

export const getStudent = async (req, res) => {
    let studentId = req.params.studentId;
    console.log("Get student route", studentId);

    const { studentName, subjects, rollNo } = await getStudentService(studentId);

    res.status(200).json({ studentName, subjects, rollNo });
};

export const deleteStudent = async (req, res) => {
    let rollNo = req.params.rollNo;
    await deleteStudentService(rollNo);
    res.sendStatus(200);
};

export const editStudentSubject = async (req, res) => {
    let studentId = req.params.studentId;
    let { subjectName } = req.body;
    console.log("studentId: ", studentId, "subjectName: ", subjectName);

    await editStudentSubjectService(studentId, subjectName);
    res.sendStatus(200);
}

export const studentForgotPassword = async (req, res) => {
    let { studentEmail, newPassword } = req.body;
    await studentForgotPasswordService(studentEmail, newPassword);
    res.sendStatus(200);
}