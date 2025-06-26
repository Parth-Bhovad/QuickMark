import { Router } from 'express';

const attendanceRouter = Router({ mergeParams: true });

attendanceRouter.post('/', (req, res) => {
    console.log("Create attendance route");
});

export default attendanceRouter;