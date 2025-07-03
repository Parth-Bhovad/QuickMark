import Joi from 'joi';

export const emailValidator = Joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    });