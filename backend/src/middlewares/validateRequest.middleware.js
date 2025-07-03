//importing custom error class
import ExpressError from '../utils/ExpressError.js';

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new ExpressError(400, error.details[0].message));
    }
    next();
  };
};

export default validateRequest;