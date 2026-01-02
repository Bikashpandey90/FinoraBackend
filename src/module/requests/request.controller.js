const authSvc = require("../auth/auth.service");
const requestSvc = require("./request.service");

class RequestController {

    create = async (req, res, next) => {
        try {
            let data = req.body
            console.log("Request Data", data)
            const request = await requestSvc.createRequest(data);
            await requestSvc.sendConfirmation(data.name, request._id, data.businessEmail)

            res.json({
                data: request,
                message: "Request Created",
                status: "ORDER_CREATED",
                options: null

            })
        } catch (exception) {
            console.log("Request Create", exception)
            next(exception)
        }
    }
    validate = async (req, res, next) => {
        try {
            const id = req.params.id
            const request = await requestSvc.getSingleRequestByFilter({ _id: id })

            request.status = 'active';
            await request.save()

            await requestSvc.sendApproved(request.name, request._id, request.businessEmail)


            res.json({
                data: request,
                message: "Request Approved",
                status: "ORDER_APPROVED",
                options: null

            })

        } catch (exception) {
            console.log("Validate Request", exception)
            next(exception)
        }
    }


    list = async (req, res, next) => {
        try {
            const requests = await requestSvc.getAllRequests()

            res.json({
                data: requests,
                message: "Request List",
                status: "ORDER_LIST",
                options: null
            })

        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    detail = async (req, res, next) => {
        try {
            const id = req.params.id
            const requests = await requestSvc.getSingleRequestByFilter({ _id: id })
            res.json({
                data: requests,
                message: "Request List",
                status: "ORDER_LIST",
                options: null
            })

        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }


}
const requestCtrl = new RequestController()
module.exports = requestCtrl