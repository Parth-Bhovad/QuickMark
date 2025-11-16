import { Router } from 'express';
//importing controllers
import { registerTeacher, loginTeacher } from '../controllers/auth.controller.js';
import { getTeacher, deleteTeacher, addSubjectToTeacher, getTeacherSubjects, teacherForgotPassword, removeSubjectFromTeacher } from '../controllers/teacher.controller.js';
//importing middlewares
import validateRequest from '../middlewares/validateRequest.middleware.js';
import isVerifiedEmail from '../middlewares/isVerifiedEmail.middleware.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
//import Joi schemas
import { registerTeacherSchema, loginTeacherSchema } from '../validators/teacher.validator.js';
//importing wrapAsync
import wrapAsync from '../utils/wrapAsync.js';
import isTeacher from '../middlewares/isTeacher.js';

const teacherRouter = Router({ mergeParams: true });

teacherRouter.post('/', validateRequest(registerTeacherSchema), wrapAsync(registerTeacher));
teacherRouter.post('/login', validateRequest(loginTeacherSchema), wrapAsync(loginTeacher));

teacherRouter.get('/:teacherId', isLoggedIn, isTeacher, wrapAsync(getTeacher));
teacherRouter.get('/:teacherId/subjects', isLoggedIn,isTeacher, wrapAsync(getTeacherSubjects));
teacherRouter.put('/:teacherId', isLoggedIn, (req, res) => {
    console.log("Update teacher route");
});
teacherRouter.delete('/:teacherId', isLoggedIn, isTeacher, wrapAsync(deleteTeacher));
teacherRouter.patch('/forgot-password', wrapAsync(teacherForgotPassword));
teacherRouter.patch('/:teacherId/subjects', isLoggedIn, isTeacher, wrapAsync(addSubjectToTeacher));
teacherRouter.delete('/:teacherId/subjects', isLoggedIn, isTeacher, wrapAsync(removeSubjectFromTeacher));

export default teacherRouter;