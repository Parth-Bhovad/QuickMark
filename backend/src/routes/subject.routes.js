import { Router } from 'express';

//importing controllers
import { createSubject, getAvailableSubjects } from '../controllers/subject.controller.js';
//importing middlewares
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isTeacher from '../middlewares/isTeacher.js';
//importing WrapAsync
import WrapAsync from '../utils/wrapAsync.js';


const subjectRouter = Router({ mergeParams: true });

subjectRouter.post('/', isLoggedIn, isTeacher, WrapAsync(createSubject));

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
subjectRouter.get('/', isLoggedIn, WrapAsync(getAvailableSubjects));

export default subjectRouter;