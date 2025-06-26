import {Router} from 'express';

const subjectRouter = Router({ mergeParams: true });

subjectRouter.post('/');
subjectRouter.get('/:subjectId');
subjectRouter.put('/:subjectId');
subjectRouter.delete('/:subjectId');
subjectRouter.get('/:subjectId/attendance');
