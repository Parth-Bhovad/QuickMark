import { Router } from 'express';
//importing controllers
import { registerTeacher, loginTeacher } from '../controllers/auth.controller.js';
import { getTeacher, deleteTeacher, addSubjectToTeacher } from '../controllers/teacher.controller.js';
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

teacherRouter.get('/:teacherId', getTeacher);
teacherRouter.put('/:teacherId', (req, res) => {
    console.log("Update teacher route");
});
teacherRouter.delete('/:teacherId', deleteTeacher);
teacherRouter.patch('/:teacherId/password', (req, res) => {
    console.log("Update teacher password route");
});
teacherRouter.patch('/:teacherId/subjects', addSubjectToTeacher)

export default teacherRouter;