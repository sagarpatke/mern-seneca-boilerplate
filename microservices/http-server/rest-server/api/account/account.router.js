var router = require('express').Router();
var accountController = require('./account.controller');

router.post('/',accountController.createAccount);

exports = module.exports = router;
