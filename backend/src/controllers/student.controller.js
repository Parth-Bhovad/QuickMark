//importing services
import { getStudentService, deleteStudentService, addSubjectToStudentService, studentForgotPasswordService } from '../services/student.service.js';

export const getStudent = async (req, res) => {
    let studentId = req.params.studentId;
    console.log("Get student route", studentId);

    const { studentName, subjects, rollNo } = await getStudentService(studentId);

    res.status(200).json({ studentName, subjects, rollNo });
};

export const deleteStudent = async (req, res) => {
    let rollNo = req.params.rollNo;
    const deletedStudent = await deleteStudentService(rollNo);
    res.status(200).json({ student: deletedStudent });
};

export const addSubjectToStudent = async (req, res) => {
        let studentId = req.params.studentId;
        let { subjectName } = req.body;

        const updatedStudent = await addSubjectToStudentService(studentId, subjectName);
        res.status(200).json({ message: "Subject added to student successfully" });
}

export const studentForgotPassword = async (req, res) => {
    let { studentEmail, newPassword } = req.body;
    const result = await studentForgotPasswordService(studentEmail, newPassword);
    res.status(200).json(result);
}