import { Router } from 'express';

const subjectRouter = Router({ mergeParams: true });

subjectRouter.post('/', (req, res)=> {
    console.log("Create subject route");
});
subjectRouter.get('/:subjectId', (req, res) => {
    let subjectId = req.params.subjectId;
    console.log("Get subject route", subjectId);
});
subjectRouter.put('/:subjectId', (req, res) => {
    let subjectId = req.params.subjectId;
    console.log("Update subject route", subjectId);
});
subjectRouter.delete('/:subjectId', (req, res) => {
    let subjectId = req.params.subjectId;
    console.log("Delete subject route", subjectId);
});
subjectRouter.get('/:subjectId/attendance', (req, res) => {
    let subjectId = req.params.subjectId;
    console.log("Get subject attendance route", subjectId);
});

export default subjectRouter;