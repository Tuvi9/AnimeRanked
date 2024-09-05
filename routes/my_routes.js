const express = require('express');
const router = express.Router();
const controllers = require('../controller/my_controllers');

router.get('/', controllers.testing);

module.exports = router;