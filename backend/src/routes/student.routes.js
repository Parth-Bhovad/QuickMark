import { Router } from 'express';

//importing controllers
import { registerStudent, loginStudent } from '../controllers/auth.controller.js';
import { getStudent, deleteStudent } from '../controllers/student.controller.js';

const studentRouter = Router({ mergeParams: true });

studentRouter.post('/', registerStudent);

studentRouter.post('/login', loginStudent);

studentRouter.get('/:rollNo', getStudent);
studentRouter.put('/:studentId', (req, res) => {
    let studentId = req.params.studentId;
    console.log("Update student route", studentId);
});
studentRouter.delete('/:rollNo', deleteStudent);
studentRouter.patch('/:studentId/password', (req, res) => {
    let studentId = req.params.studentId;
    console.log("Update student password route", studentId);
});

export default studentRouter;