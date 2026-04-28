const mongoose = require("mongoose");
const { commonStr, schemaOpts } = require("../../common/schema");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 100,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      min: 5,
      max: 5000,
    },
    ...commonStr,
  },
  schemaOpts,
);
const ContactModel = mongoose.model("Contact", ContactSchema);
module.exports = ContactModel;
