import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";

const requireRole = (roles) => {
    return (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return next(new ExpressError(401, "Unauthorized"));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!roles.includes(decoded.role)) {
            return next(new ExpressError(403, "Forbidden"));
        }

        req.user = decoded; // attach user data to request
        next();
    };
};

export default requireRole;