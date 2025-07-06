import { Router } from 'express';

//importing controllers
import { sendOTPEmail, verifyOTPEmail, authMe } from '../controllers/auth.controller.js';
//importing middlewares
import validateRequest from '../middlewares/validateRequest.middleware.js';
//import Joi schemas
import { emailValidator } from '../validators/email.validator.js';
import { otpValidator } from '../validators/otp.validator.js';
//importing wrapAsync
import wrapAsync from '../utils/wrapAsync.js';

const authenticateRouter = Router({ mergeParams: true });

authenticateRouter.get('/me', wrapAsync(authMe));

authenticateRouter.post('/send-otp', validateRequest(emailValidator), wrapAsync(sendOTPEmail));

authenticateRouter.post('/resend-otp', wrapAsync((req, res) => {
    console.log("resend-otp route");
}));

authenticateRouter.post('/verify-otp', validateRequest(otpValidator), wrapAsync(verifyOTPEmail));

export default authenticateRouter;