import jwt from 'jsonwebtoken';
//importing Express Error Handler
import ExpressError from '../utils/ExpressError.js';

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err);
        throw new ExpressError(401, 'You are not logged in. Please log in to access this resource.');
    }
}

export default isLoggedIn;