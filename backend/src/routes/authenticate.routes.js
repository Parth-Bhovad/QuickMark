import { Router } from 'express';

const authenticateRouter = Router({ mergeParams: true });

authenticateRouter.post('/send-otp', (req, res) => {
    console.log("send-otp route");
});
authenticateRouter.post('/resend-otp', (req, res) => {
    console.log("resend-otp route");
});

authenticateRouter.post('/verify-otp', (req, res) => {
    console.log("verify-otp route");
});

export default authenticateRouter;