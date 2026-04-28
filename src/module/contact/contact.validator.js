const Joi = require("joi");

const ContactDTO = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
  }),
  message: Joi.string().min(5).max(5000).required(),
});

module.exports = {
  ContactDTO,
};
