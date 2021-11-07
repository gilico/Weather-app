const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/' , weatherController.LocationSearchPage);
router.post('/', weatherController.LocationSearch)

module.exports = router;