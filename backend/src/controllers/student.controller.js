//importing services
import { getStudentService, deleteStudentService, addSubjectToStudentService } from '../services/student.service.js';

export const getStudent = async (req, res) => {
    let rollNo = req.params.rollNo;
    console.log("Get student route", rollNo);

    const student = await getStudentService(rollNo);

    res.status(200).json({ student });
};

export const deleteStudent = async (req, res) => {
    let rollNo = req.params.rollNo;
    const deletedStudent = await deleteStudentService(rollNo);
    res.status(200).json({ student: deletedStudent });
};

export const addSubjectToStudent = async (req, res) => {
    try {
        let rollNo = req.params.rollNo;
        let {subjectName} = req.body;

        const updatedStudent = await addSubjectToStudentService(rollNo, subjectName);
        res.status(200).json({ message: "Subject added to student successfully" });
    } catch (error) {
        console.error("Error adding subject to student:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}