import { Router } from 'express';

//importing controllers
import { registerStudent, loginStudent } from '../controllers/auth.controller.js';
import { getStudent, deleteStudent, editStudentSubject, studentForgotPassword } from '../controllers/student.controller.js';
//importing middlewares
import validateRequest from '../middlewares/validateRequest.middleware.js';
import isVerifiedEmail from '../middlewares/isVerifiedEmail.middleware.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
//import Joi schemas
import { registerStudentSchema, loginStudentSchema } from '../validators/student.validator.js';
//importing wrapAsync
import wrapAsync from '../utils/wrapAsync.js';

const studentRouter = Router({ mergeParams: true });

studentRouter.post('/', validateRequest(registerStudentSchema), isVerifiedEmail, wrapAsync(registerStudent));

studentRouter.post('/login', validateRequest(loginStudentSchema), wrapAsync(loginStudent));

studentRouter.get('/:studentId', isLoggedIn, wrapAsync(getStudent));
studentRouter.put('/:studentId', isLoggedIn, (req, res) => {
    let studentId = req.params.studentId;
    console.log("Update student route", studentId);
});
studentRouter.delete('/:studentId', isLoggedIn, wrapAsync(deleteStudent));
studentRouter.patch('/forgot-password', isVerifiedEmail, wrapAsync(studentForgotPassword));
studentRouter.patch('/:studentId/subjects', isLoggedIn, wrapAsync(editStudentSubject));
export default studentRouter;