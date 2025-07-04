import Joi from 'joi';

export const otpValidator = Joi.object({
    otp: Joi.string().length(6).required().messages({
        'string.length': 'OTP must be 6 characters long',
        'any.required': 'OTP is required',
    }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required',
        })
});