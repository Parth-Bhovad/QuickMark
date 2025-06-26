import { Router } from 'express';

const teacherRouter = Router({ mergeParams: true });

teacherRouter.post('/', (req, res) => {
    console.log("Create teacher route");
});
teacherRouter.get('/:teacherId', (req, res) => {
    console.log("Get teacher route");
});
teacherRouter.put('/:teacherId', (req, res) => {
    console.log("Update teacher route");
});
teacherRouter.delete('/:teacherId', (req, res) => {
    console.log("Delete teacher route");
});
teacherRouter.patch('/:teacherId/password', (req, res) => {
    console.log("Update teacher password route");
});

export default teacherRouter;