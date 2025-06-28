import { Router } from 'express';
//importing controllers
import { registerTeacher, loginTeacher } from '../controllers/auth.controller.js';
import { getTeacher, deleteTeacher } from '../controllers/teacher.controller.js';

const teacherRouter = Router({ mergeParams: true });

teacherRouter.post('/', registerTeacher);
teacherRouter.post('/login', loginTeacher);

teacherRouter.get('/:teacherId', getTeacher);
teacherRouter.put('/:teacherId', (req, res) => {
    console.log("Update teacher route");
});
teacherRouter.delete('/:teacherId', deleteTeacher);
teacherRouter.patch('/:teacherId/password', (req, res) => {
    console.log("Update teacher password route");
});

export default teacherRouter;