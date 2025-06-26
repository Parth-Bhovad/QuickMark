import {Router} from 'express';

const teacherRouter = Router({ mergeParams: true });

teacherRouter.post('/');
teacherRouter.get('/:teacherId');
teacherRouter.put('/:teacherId');
teacherRouter.delete('/:teacherId');
teacherRouter.patch('/:teacherId/password');
