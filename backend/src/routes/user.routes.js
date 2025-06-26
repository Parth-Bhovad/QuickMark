import {Router} from 'express';

const userRouter = Router({ mergeParams: true });

userRouter.post('/');
userRouter.get('/:userId');
userRouter.put('/:userId');
userRouter.delete('/:userId');
userRouter.patch('/:userId/password');