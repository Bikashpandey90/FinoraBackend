const { formatDateTOYMD } = require("../../helper/utils");
const contactSvc = require("./contact.service");

class ContactController {
  create = async (req, res, next) => {
    try {
      let data = req.body;
      console.log("Contact Data", data);
      const contact = await contactSvc.createContact(data);
      const date = formatDateTOYMD(contact.createdAt);
      await contactSvc.sendConfirmation(
        contact.name,
        contact._id,
        contact.email,
        date,
      );

      res.json({
        data: contact,
        message: "Contact Created",
        status: "CONTACT_CREATED",
        options: null,
      });
    } catch (exception) {
      console.log("Contact Create", exception);
      next(exception);
    }
  };
  validate = async (req, res, next) => {
    try {
      const id = req.params.id;
      const contact = await contactSvc.getSingleContactByFilter({ _id: id });
      if (contact.status === "active") {
        return res.json({
          message: "Already Validated",
        });
      }

      contact.status = "active";
      await contact.save();
      const date = formatDateTOYMD(contact.createdAt);
      await contactSvc.sendApproved(
        contact.name,
        contact._id,
        contact.businessEmail,
        date,
      );

      res.json({
        data: contact,
        message: "Contact Approved",
        status: "CONTACT_APPROVED",
        options: null,
      });
    } catch (exception) {
      console.log("Validate Contact", exception);
      next(exception);
    }
  };

  list = async (req, res, next) => {
    try {
      const contacts = await contactSvc.getAllContacts();

      res.json({
        data: contacts,
        message: "Contact List",
        status: "CONTACT_LIST",
        options: null,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };
  detail = async (req, res, next) => {
    try {
      const id = req.params.id;
      const contacts = await contactSvc.getSingleContactByFilter({ _id: id });
      res.json({
        data: contacts,
        message: "Contact List",
        status: "CONTACT_LIST",
        options: null,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };
  delete = async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await contactSvc.deleteByFilter({ _id: id });
      res.json({
        detail: response,
        message: "Item Delete Sucess",
        status: "DELETE_SUCESS",
        options: null,
      });
    } catch (exception) {
      console.log("Delete Exception : ", exception);
      next(exception);
    }
  };
}
const contactCtrl = new ContactController();
module.exports = contactCtrl;
