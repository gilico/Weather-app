const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');


router.get('/', weatherController.IndexMain);
router.post('/' , weatherController.QuickSearch);

// router.get('/search' , weatherController.LocationSearchPage);
// router.post('/search', weatherController.LocationSearch)

module.exports = router;