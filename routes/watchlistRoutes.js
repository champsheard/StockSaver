const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');


router.get('/', watchlistController.getWatchlist);
router.get('/analytics', watchlistController.getAnalytics);
router.get('/data' , watchlistController.getWatchlistData);
router.post('/add', watchlistController.addToWatchlist);
router.delete('/remove', watchlistController.removeFromWatchlist);



module.exports = router;


