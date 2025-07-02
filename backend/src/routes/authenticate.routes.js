import { Router } from 'express';

//importing controllers
import { sendOTPEmail, verifyOTPEmail } from '../controllers/auth.controller.js';

const authenticateRouter = Router({ mergeParams: true });

authenticateRouter.post('/send-otp', sendOTPEmail);

authenticateRouter.post('/resend-otp', (req, res) => {
    console.log("resend-otp route");
});

authenticateRouter.post('/verify-otp', verifyOTPEmail);

export default authenticateRouter;