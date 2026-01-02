const { checkLogin } = require('../../middlewares/auth.middleware')
const { bodyValidator } = require('../../middlewares/body.validator')
const uploader = require('../../middlewares/multipart-parser.middleware')
const { allowedRole } = require('../../middlewares/rbac.middleware')
const requestCtrl = require('./request.controller')
const { RequestDTO } = require('./request.validator')

const requestRouter = require('express').Router()

requestRouter.post('/create', bodyValidator(RequestDTO), requestCtrl.create)
requestRouter.get('/validate/:id', checkLogin, allowedRole('admin'), requestCtrl.validate)
requestRouter.get('/list', checkLogin, allowedRole('admin'), requestCtrl.list)
requestRouter.get('/detail/:id', checkLogin, allowedRole('admin'), requestCtrl.detail)

module.exports = requestRouter