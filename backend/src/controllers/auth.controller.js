//import necessary services
import { registerStudentService, loginStudentService, registerTeacherService, loginTeacherService } from '../services/auth.service.js';

export const registerStudent = async (req, res) => {
    try {
        let { studentName, rollNo, studentEmail, studentPassword } = req.body;
        const { student, token } = await registerStudentService(studentName, rollNo, studentEmail, studentPassword);
        res.cookie('token', token, {
            httpOnly: true,
        });
        res.status(201).json({ student, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

export const loginStudent = async (req, res) => {
    try {
        let { studentEmail, studentPassword } = req.body;
        console.log(req.body);
        
        console.log(studentEmail, studentPassword);
        const { student, token } = await loginStudentService(studentEmail, studentPassword);
        res.cookie('token', token, {
            httpOnly: true,
        });
        res.status(200).json({ student, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

export const registerTeacher = async (req, res) => {
    try {
        let { teacherName, teacherEmail, teacherPassword } = req.body;
        const { teacher, token } = await registerTeacherService(teacherName, teacherEmail, teacherPassword);
        res.cookie('token', token, {
            httpOnly: true,
        });
        res.status(201).json({ teacher, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

export const loginTeacher = async (req, res) => {
    try {
        let { teacherEmail, teacherPassword } = req.body;
        const { teacher, token } = await loginTeacherService(teacherEmail, teacherPassword);
        res.cookie('token', token, {
            httpOnly: true,
        });
        res.status(200).json({ teacher, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}