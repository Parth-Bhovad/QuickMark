//import necessary services
import { registerStudentService, loginStudentService, registerTeacherService, loginTeacherService, sendOTPEmailService, verifyOTPService } from '../services/auth.service.js';

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

export const sendOTPEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = await sendOTPEmailService(email);
    // TODO: store OTP in DB or memory store with expiry
    console.log(`OTP sent to ${email}: ${otp}`);
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifyOTPEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const isValid = await verifyOTPService(email, otp);
    if (isValid) {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};