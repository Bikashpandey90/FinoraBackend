const authRouter = require("../module/auth/auth.router");
const contactRouter = require("../module/contact/contact.router");
const requestRouter = require("../module/requests/request.router");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/request", requestRouter);
router.use("/contact", contactRouter);

module.exports = router;
