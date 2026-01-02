const authRouter = require('../module/auth/auth.router');
const requestRouter = require('../module/requests/request.router');

const router = require('express').Router();

router.use('/auth', authRouter)
router.use('/request', requestRouter)



module.exports = router;