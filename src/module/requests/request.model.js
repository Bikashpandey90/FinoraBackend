const mongoose = require("mongoose");
const { commonStr, schemaOpts } = require("../../common/schema");

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
    "In-house accountant/bookkeeper",
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


const RequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    businessEmail: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    answers: {
        businessType: {
            type: String,
            enum: BUSINESS_TYPES,
            required: true
        },
        financeManagement: {
            type: String,
            enum: FINANCE_MANAGEMENT,
            required: true
        },
        software: {
            type: String,
            enum: SOFTWARE_OPTIONS,
            required: true
        },
        timing: {
            type: String,
            enum: TIMING_OPTIONS,
            required: true
        },
        followUp: {
            type: String,
            enum: FOLLOW_UP_OPTIONS,
            required: true
        },
        challenge: {
            type: String,
            minlength: 5,
            maxlength: 1000,
            required: true,


        },
    },
    ...commonStr
}, schemaOpts)
const RequestModel = mongoose.model('Request', RequestSchema);
module.exports = RequestModel;