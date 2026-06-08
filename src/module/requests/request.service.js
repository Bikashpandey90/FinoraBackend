const fileUploaderService = require("../../services/fileUploader.service");
const emailSvc = require("../../services/mail.service");
const { inquiryReceivedEmail, requestApprovedEmail } = require("./email");
const RequestModel = require("./request.model");
const fs = require("fs");
const hbs = require("handlebars");

class RequestSvc {
  // transformRequest = async (req) => {
  //     try {

  //         let data = req.body;
  //         // let file = req.file;  //single upload
  //         // if (file) {
  //         //     data.image = await fileUploaderService.uploadFile(file.path, '/request')
  //         // }
  //         data.status = 'inactive';
  //         return data

  //     } catch (exception) {
  //         console.log(exception);
  //         throw exception
  //     }
  // }
  createRequest = async (data) => {
    try {
      const requestObj = new RequestModel(data);
      return await requestObj.save();
    } catch (exception) {
      console.log("Create user", exception);
      throw exception;
    }
  };

  getSingleRequestByFilter = async (filter) => {
    try {
      const request = await RequestModel.findOne(filter);

      if (!request) {
        throw {
          code: "422",
          status: "USER_NOT_FOUND",
          message: "Request not found",
          detail: "",
        };
      }

      return request;
    } catch (exception) {
      console.log("GETSIGNLEORDERBYFILTER ERROR : ", exception);
      throw exception;
    }
  };

  sendConfirmation = async (name, requestId, email, date) => {
    try {
      const template = fs.readFileSync(
        "src/emails/inquiryReceived.hbs",
        "utf-8",
      );
      const compiled = hbs.compile(template);

      let data = {
        name,
        subject: "General Inquiry",
        date,
        requestId,
        from: "support@finoracfo.com",
        websiteUrl: "https://finoracfo.com",
        faqUrl: "https://finoracfo.com/#faq",
        supportUrl: "https://finoracfo.com/support",
        communityUrl: "https://finoracfo.com/community",
        unsubscribeUrl: "https://finoracfo.com/",
        privacyPolicyUrl: "https://finoracfo.com/",
        contactUrl: "https://finoracfo.com/contact",
      };
      const html = compiled(data);

      await emailSvc.sendEmail({
        to: email,
        subject: "Request Receieved",
        message: html,
      });
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  };
  //   sendOrderAssigned = async (data, email) => {
  //     try {
  //       // let msg = CraftsmanMail(order);

  //       const template = fs.readFileSync("src/emails/artist.hbs", "utf-8");
  //       const compiled = hbs.compile(template);

  //       const html = compiled(data);

  //       await emailSvc.sendEmail({
  //         to: email,
  //         subject: "Order Assigned",
  //         message: html,
  //       });
  //     } catch (exception) {
  //       console.log(exception);
  //       throw exception;
  //     }
  //   };

  sendApproved = async (name, requestId, email, date) => {
    try {
      let msg = requestApprovedEmail({
        name,
        requestId,
        from: process.env.SMTP_FROM,
        date,
      });
      await emailSvc.sendEmail({
        to: email,
        subject: "Request Approved",
        message: msg,
      });
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  };

  getAllRequests = async () => {
    try {
      const response = await RequestModel.find().sort({ createdAt: -1 });
      return response;
    } catch (exception) {
      console.log("All Requests LIst error", exception);
      throw exception;
    }
  };
}
const requestSvc = new RequestSvc();
module.exports = requestSvc;
