import { Router } from 'express';
//importing controllers
import { registerTeacher, loginTeacher } from '../controllers/auth.controller.js';
import { getTeacher, deleteTeacher, addSubjectToTeacher, getTeacherSubjects, teacherForgotPassword } from '../controllers/teacher.controller.js';
//importing middlewares
import validateRequest from '../middlewares/validateRequest.middleware.js';
import isVerifiedEmail from '../middlewares/isVerifiedEmail.middleware.js';
//import Joi schemas
import { registerTeacherSchema, loginTeacherSchema } from '../validators/teacher.validator.js';
//importing wrapAsync
import wrapAsync from '../utils/wrapAsync.js';

const teacherRouter = Router({ mergeParams: true });

teacherRouter.post('/', validateRequest(registerTeacherSchema), isVerifiedEmail, wrapAsync(registerTeacher));
teacherRouter.post('/login', validateRequest(loginTeacherSchema), wrapAsync(loginTeacher));

teacherRouter.get('/:teacherId', wrapAsync(getTeacher));
teacherRouter.get('/:teacherId/subjects', wrapAsync(getTeacherSubjects));
teacherRouter.put('/:teacherId', (req, res) => {
    console.log("Update teacher route");
});
teacherRouter.delete('/:teacherId', wrapAsync(deleteTeacher));
teacherRouter.patch('/forgot-password', isVerifiedEmail, wrapAsync(teacherForgotPassword));
teacherRouter.patch('/:teacherId/subjects', wrapAsync(addSubjectToTeacher));

export default teacherRouter;