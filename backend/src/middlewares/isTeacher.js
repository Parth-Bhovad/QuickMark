import ExpressError from '../utils/ExpressError.js';

const isTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        return next();
    }
    throw new ExpressError(403, 'Access denied. You must be a teacher to access this resource.');
}

export default isTeacher;