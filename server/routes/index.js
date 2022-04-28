
const Router = require('express');
const router = new Router();
const pingRouter = require('./pingRouter');
const ipRouter = require('./ipRouter');
const userRouter = require('./userRouter');

router.use('/ping', pingRouter);
router.use('/ip', ipRouter);
router.use('/', userRouter);

module.exports = router;
