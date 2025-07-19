import { Router } from 'express';

//importing controllers
import { registerStudent, loginStudent } from '../controllers/auth.controller.js';
import { getStudent, deleteStudent, addSubjectToStudent } from '../controllers/student.controller.js';
//importing middlewares
import validateRequest from '../middlewares/validateRequest.middleware.js';
import isVerifiedEmail from '../middlewares/isVerifiedEmail.middleware.js';
//import Joi schemas
import { registerStudentSchema, loginStudentSchema } from '../validators/student.validator.js';
//importing wrapAsync
import wrapAsync from '../utils/wrapAsync.js';

const studentRouter = Router({ mergeParams: true });

studentRouter.post('/', validateRequest(registerStudentSchema), isVerifiedEmail, wrapAsync(registerStudent));

studentRouter.post('/login', validateRequest(loginStudentSchema), wrapAsync(loginStudent));

studentRouter.get('/:studentId', wrapAsync(getStudent));
studentRouter.put('/:studentId', (req, res) => {
    let studentId = req.params.studentId;
    console.log("Update student route", studentId);
});
studentRouter.delete('/:studentId', wrapAsync(deleteStudent));
studentRouter.patch('/:studentId/password', (req, res) => {
    let studentId = req.params.studentId;
    console.log("Update student password route", studentId);
});
studentRouter.patch('/:studentId/subjects', wrapAsync(addSubjectToStudent));
export default studentRouter;