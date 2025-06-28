//import necessary services
import { registerStudentService } from '../services/auth.service.js';

export const registerStudent = async (req, res) => {
    try {
        let { studentName, rollNo, studentEmail, password } = req.body;
        const { user, token } = await registerStudentService(studentName, rollNo, studentEmail, password);
        res.status(201).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}