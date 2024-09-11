const express = require('express');
const router = express.Router();
const controllers = require('../controller/my_controllers');

router.post('/', controllers.createBlog);
router.get('/', controllers.getBlogs)

module.exports = router;