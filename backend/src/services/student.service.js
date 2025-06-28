import { findStudentByRollNo } from "../dao/student.dao.js";

export const getStudentService = async (rollNo) => {
    const student = await findStudentByRollNo(rollNo);
    if (!student) {
        throw new Error(`Student with Roll No: ${rollNo} not found`);
    }
    return student;
}
