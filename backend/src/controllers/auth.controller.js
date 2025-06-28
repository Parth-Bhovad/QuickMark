//import necessary services
import { registerUserService } from '../services/auth.service.js';

export const registerUser = async (req, res) => {
    try {
        let { studentName, rollNo, studentEmail, password } = req.body;
        const { user, token } = await registerUserService(studentName, rollNo, studentEmail, password);
        res.status(201).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}