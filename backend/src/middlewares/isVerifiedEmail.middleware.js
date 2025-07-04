import { getVerificationCode } from '../utils/generateOTP.js';
import ExpressError from '../utils/ExpressError.js';

const isVerifiedEmail = (req, res, next) => {
    // Check if the user has a verified email
    const storedOtp = getVerificationCode(req.body.teacherEmail) || getVerificationCode(req.body.studentEmail);
    if (storedOtp) {
        return next();
    } else {
        throw new ExpressError(403, "Email not verified");
    }
}

export default isVerifiedEmail;