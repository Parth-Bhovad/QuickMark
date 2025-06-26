import {Router} from 'express';

//importing individual routers
import authenticateRouter from './authenticate.routes.js';
import userRouter from './user.routes.js';
import subjectRouter from './subject.routes.js';
import attendanceRouter from './attendance.routes.js';
import teacherRouter from './teacher.routes.js';

const mainRouter = Router({ mergeParams: true });

mainRouter.use('/authenticate', authenticateRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/subjects', subjectRouter);
mainRouter.use('/attendance', attendanceRouter);
mainRouter.use('/teachers', teacherRouter);

export default mainRouter;