//importing services
import {getStudentService} from '../services/student.service.js';

export const getStudent = async (req, res) => {
    let rollNo = req.params.rollNo;
    console.log("Get student route", rollNo);

    const student = await getStudentService(rollNo);

    res.status(200).json({ student });
}