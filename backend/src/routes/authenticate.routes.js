import {Router} from 'express';

const authenticateRouter = Router({ mergeParams: true });

authenticateRouter.post('/send-otp');
authenticateRouter.post('/resend-otp');
authenticateRouter.post('/verify-otp');
