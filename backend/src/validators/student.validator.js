import Joi from 'joi';

export const registerStudentSchema  = Joi.object({
    rollNo: Joi.number()
        .integer()
        .min(10000)
        .max(99999)
        .required(),
    studentName: Joi.string()
        .trim()
        .pattern(/^[A-Za-z ]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Name can only contain alphabets and spaces',
        }),
    studentEmail: Joi.string()
        .email()
        .required(),
    studentPassword: Joi.string()
        .min(6)
        .required(),
    subjects: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // MongoDB ObjectId validation
        .default([]),
    otp: Joi.string()
        .length(6)
        .required()
});

export const loginStudentSchema = Joi.object({
    studentEmail: Joi.string()
        .email()
        .required(),
    studentPassword: Joi.string()
        .min(6)
        .required()
});