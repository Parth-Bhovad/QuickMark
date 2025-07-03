import Joi from 'joi';

export const registerTeacherSchema = Joi.object({
    teacherName: Joi.string()
        .pattern(/^[A-Za-z ]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Name can only contain alphabets and spaces',
        }),
    teacherEmail: Joi.string()
        .email()
        .required(),
    teacherPassword: Joi.string()
        .min(6)
        .required(),
    subjects: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // MongoDB ObjectId validation
        .default([]),
});

export const loginTeacherSchema = Joi.object({
    teacherEmail: Joi.string()
        .email()
        .required(),
    teacherPassword: Joi.string()
        .min(6)
        .required(),
});