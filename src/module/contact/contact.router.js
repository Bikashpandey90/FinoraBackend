const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/body.validator");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowedRole } = require("../../middlewares/rbac.middleware");
const contactCtrl = require("./contact.controller");
const { ContactDTO } = require("./contact.validator");

const contactRouter = require("express").Router();

contactRouter.post("/create", bodyValidator(ContactDTO), contactCtrl.create);
contactRouter.get(
  "/validate/:id",
  checkLogin,
  allowedRole("admin"),
  contactCtrl.validate,
);
contactRouter.get("/list", checkLogin, allowedRole("admin"), contactCtrl.list);
contactRouter.get(
  "/detail/:id",
  checkLogin,
  allowedRole("admin"),
  contactCtrl.detail,
);
contactRouter.delete(
  "/:id",
  checkLogin,
  allowedRole("admin"),
  contactCtrl.delete,
);

module.exports = contactRouter;
