const router = require('express').Router();
const accountController = require('./account.controller');
const context = require('../../context');

router.post('/',accountController.createAccount);
router.put('/', context.authorizeMiddleware, accountController.changePassword);

exports = module.exports = router;
