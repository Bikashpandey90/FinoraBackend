const fileUploaderService = require("../../services/fileUploader.service");
const emailSvc = require("../../services/mail.service");
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


    sendConfirmation = async (name, requestId, email) => {
        try {
            let msg = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            brequest-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .content {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
        }
        .request-box {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            text-align: center;
            padding: 12px;
            background: #f8f8f8;
            brequest-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            text-align: center;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Request Confirmed 🎉</div>
        <div class="content">
            <p>Dear ${name},</p>

            <p>Thank you for placing your request with us. We’re happy to let you know that your request has been successfully received.</p>

            <p><strong>Your Request ID:</strong></p>
            <div class="request-box">#${requestId}</div>

            <p>Our team will review your request and update you once it is processed.</p>

            <p>If you have any questions, feel free to contact us.</p>

            <p>Warm regards,<br/>
            <strong>${process.env.SMTP_FROM}</strong></p>
        </div>
        <div class="footer">
            <em>This is an automated email. Please do not reply directly.</em>
        </div>
    </div>
</body>
</html>`

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

    sendApproved = async (name, requestId, email) => {
        try {
            let msg = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Approved</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            brequest-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            font-size: 24px;
            font-weight: bold;
            color: #2e7d32;
        }
        .content {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
        }
        .request-box {
            font-size: 18px;
            font-weight: bold;
            color: #2e7d32;
            text-align: center;
            padding: 12px;
            background: #f1f8f4;
            brequest-radius: 5px;
            margin: 20px 0;
        }
        .status {
            text-align: center;
            font-size: 14px;
            color: #2e7d32;
            margin-bottom: 10px;
        }
        .footer {
            font-size: 12px;
            text-align: center;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Request Approved ✅</div>
        <div class="content">
            <p>Dear ${name},</p>

            <p>Great news! Your request has been <strong>approved</strong> and is now being prepared for the next step.</p>

            <div class="status"><strong>Status:</strong> Approved</div>

            <p><strong>Request ID:</strong></p>
            <div class="request-box">${requestId}</div>

            <p>We’ll notify you once your request moves to the next stage.</p>

            <p>If you need any assistance, feel free to reach out to us.</p>

            <p>Warm regards,<br/>
            <strong>${process.env.SMTP_FROM}</strong></p>
        </div>
        <div class="footer">
            <em>This is an automated email. Please do not reply directly.</em>
        </div>
    </div>
</body>
</html>`

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

            return response

        } catch (exception) {
            console.log("All Requests LIst error", exception)
            throw exception
        }
    }

   

}
const requestSvc = new RequestSvc()
module.exports = requestSvc
