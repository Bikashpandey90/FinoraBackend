const Joi = require("joi");

const BUSINESS_TYPES = [
    "General Contracting",
    "Residential",
    "Roofing / Electrical / Plumbing",
    "Commercial",
    "Others",
];

const FINANCE_MANAGEMENT = [
    "Outside firm",
    "It's messy right now",
    "In-house accountant",
    "I do it myself",
];

const SOFTWARE_OPTIONS = [
    "Sage",
    "Foundation",
    "QuickBooks Online",
    "Xero",
    "Not using any yet",
];

const TIMING_OPTIONS = [
    "Immediately (next 24-48 hours)",
    "Within a week",
    "Just exploring for now",
];

const FOLLOW_UP_OPTIONS = [
    "Yes, definitely",
    "Maybe, depends on the findings",
    "No, I just want to see the report",
];


const RequestDTO = Joi.object({

    name: Joi.string().min(3).max(100).required(),
    businessEmail: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Business email must be valid",
        }),
    phone: Joi.string()
        .pattern(/^[0-9+\-\s]{7,20}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number format is invalid",
        }),
    company: Joi.string().min(2).max(100).required(),

    answers: Joi.object({
        businessType: Joi.string()
            .valid(...BUSINESS_TYPES)
            .required()
            .messages({
                "any.only": "Invalid business type selected",
            }),

        financeManagement: Joi.string()
            .valid(...FINANCE_MANAGEMENT)
            .required()
            .messages({
                "any.only": "Invalid finance management option",
            }),

        software: Joi.string()
            .valid(...SOFTWARE_OPTIONS)
            .required()
            .messages({
                "any.only": "Invalid software option",
            }),

        timing: Joi.string()
            .valid(...TIMING_OPTIONS)
            .required()
            .messages({
                "any.only": "Invalid timing option",
            }),

        followUp: Joi.string()
            .valid(...FOLLOW_UP_OPTIONS)
            .required()
            .messages({
                "any.only": "Invalid follow-up option",
            }),

        challenge: Joi.string()
            .min(5)
            .max(1000)
            .required()
            .messages({
                "string.min": "Challenge must be at least 5 characters",
            }),
    }).required()
        .options({ abortEarly: false })



})

// const Joi = require("joi");

// const RequestDTO = Joi.object({
//     name: Joi.string().min(3).max(100).required(),

//     businessEmail: Joi.string().email().required(),

//     phone: Joi.string().required(),

//     company: Joi.string().required(),

//     answers: Joi.object({
//         businessType: Joi.string().required(),
//         financeManagement: Joi.string().required(),
//         software: Joi.string().required(),
//         timing: Joi.string().required(),
//         followUp: Joi.string().required(),
//         challenge: Joi.string().required(),
//     }).required(),
// })


module.exports = {
    RequestDTO,
}