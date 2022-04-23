
const Router = require('express');
const router = new Router();
const pingRouter = require('./pingRouter');
const ipRouter = require('./ipRouter');

router.use('/ping', pingRouter);
router.use('/ip', ipRouter);

module.exports = router;
