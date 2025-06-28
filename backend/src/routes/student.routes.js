import { Router } from 'express';

//importing controllers
import { registerStudent, loginStudent } from '../controllers/auth.controller.js';
import { getStudent } from '../controllers/student.controller.js';

const studentRouter = Router({ mergeParams: true });

studentRouter.post('/', registerStudent);

studentRouter.post('/login', loginStudent);

studentRouter.get('/:rollNo', getStudent);
studentRouter.put('/:studentId', (req, res) => {
    let studentId = req.params.studentId;
    console.log("Update student route", studentId);
});
studentRouter.delete('/:studentId', (req, res) => {
    let studentId = req.params.studentId;
    console.log("Delete student route", studentId);
});
studentRouter.patch('/:studentId/password', (req, res) => {
    let studentId = req.params.studentId;
    console.log("Update student password route", studentId);
});

export default studentRouter;