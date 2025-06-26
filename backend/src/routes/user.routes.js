import { Router } from 'express';

const userRouter = Router({ mergeParams: true });

userRouter.post('/', (req, res)=> {
    console.log("Create user route");
});
userRouter.get('/:userId', (req, res) => {
    let userId = req.params.userId;
    console.log("Get user route", userId);
});
userRouter.put('/:userId', (req, res) => {
    let userId = req.params.userId;
    console.log("Update user route", userId);
});
userRouter.delete('/:userId', (req, res) => {
    let userId = req.params.userId;
    console.log("Delete user route", userId);
});
userRouter.patch('/:userId/password', (req, res) => {
    let userId = req.params.userId;
    console.log("Update user password route", userId);
});

export default userRouter;