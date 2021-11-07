const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/' , weatherController.MapPage);
router.post('/', weatherController.MapPagePost)

module.exports = router;