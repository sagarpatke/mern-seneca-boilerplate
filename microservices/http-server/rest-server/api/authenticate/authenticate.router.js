var router = require('express').Router();
var controller = require('./authenticate.controller');

router.post('/',controller.createToken);

exports = module.exports = router;
