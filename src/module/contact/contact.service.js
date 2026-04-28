const fileUploaderService = require("../../services/fileUploader.service");
const emailSvc = require("../../services/mail.service");
const { inquiryReceivedEmail, requestApprovedEmail } = require("./email");
const ContactModel = require("./contact.model");

class ContactSvc {
  createContact = async (data) => {
    try {
      const contactObj = new ContactModel(data);
      return await contactObj.save();
    } catch (exception) {
      console.log("Create user", exception);
      throw exception;
    }
  };

  getSingleContactByFilter = async (filter) => {
    try {
      const contact = await ContactModel.findOne(filter);

      if (!contact) {
        throw {
          code: "422",
          status: "ITEM_NOT_FOUND",
          message: "Contact not found",
          detail: "",
        };
      }

      return contact;
    } catch (exception) {
      console.log("GETSIGNLEORDERBYFILTER ERROR : ", exception);
      throw exception;
    }
  };

  sendConfirmation = async (name, contactId, email, date) => {
    try {
      let msg = inquiryReceivedEmail({
        name,
        contactId,
        from: process.env.SMTP_FROM,
        date,
      });

      await emailSvc.sendEmail({
        to: email,
        subject: "Contact Receieved",
        message: msg,
      });
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  };

  sendApproved = async (name, contactId, email, date) => {
    try {
      let msg = contactApprovedEmail({
        name,
        contactId,
        from: process.env.SMTP_FROM,
        date,
      });
      await emailSvc.sendEmail({
        to: email,
        subject: "Contact Approved",
        message: msg,
      });
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  };

  getAllContacts = async () => {
    try {
      const response = await ContactModel.find().sort({ createdAt: -1 });
      return response;
    } catch (exception) {
      console.log("All Contacts LIst error", exception);
      throw exception;
    }
  };
  deleteByFilter = async (filter = {}) => {
    try {
      const user = await ContactModel.findOneAndDelete(filter);
      if (!user) {
        throw {
          code: "422",
          status: "ITEM_NOT_FOUND",
          message: "Item not found",
        };
      }
      return user;
    } catch (exception) {
      throw exception;
    }
  };
}
const contactSvc = new ContactSvc();
module.exports = contactSvc;
