const fileUploaderService = require("../../services/fileUploader.service");
const emailSvc = require("../../services/mail.service");
const { inquiryReceivedEmail, requestApprovedEmail } = require("./email");
const RequestModel = require("./request.model");

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
            throw exception
        }
    }

    getSingleRequestByFilter = async (filter) => {
        try {
            const request = await RequestModel.findOne(filter)

            if (!request) {
                throw { code: "422", status: "USER_NOT_FOUND", message: "Request not found", detail: "" }
            }

            return request;

        } catch (exception) {
            console.log("GETSIGNLEORDERBYFILTER ERROR : ", exception);
            throw exception

        }
    }


    sendConfirmation = async (name, requestId, email, date) => {
        try {
         
            let msg = inquiryReceivedEmail({ name, requestId, from: process.env.SMTP_FROM, date })

            await emailSvc.sendEmail({
                to: email,
                subject: "Request Receieved",
                message: msg,
            });

        } catch (exception) {
            console.log(exception)
            throw exception

        }
    }

    sendApproved = async (name, requestId, email, date) => {
        try {
        
            let msg = requestApprovedEmail({ name, requestId, from: process.env.SMTP_FROM, date })
            await emailSvc.sendEmail({
                to: email,
                subject: "Request Approved",
                message: msg,
            });

        } catch (exception) {
            console.log(exception)
            throw exception

        }
    }

    getAllRequests = async () => {
        try {
            const response = await RequestModel.find()
                .sort({ createdAt: -1 })
            return response

        } catch (exception) {
            console.log("All Requests LIst error", exception)
            throw exception
        }
    }



}
const requestSvc = new RequestSvc()
module.exports = requestSvc
