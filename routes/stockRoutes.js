const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');


router.get('/:ticker', stockController.getStock);
router.get('/:ticker/history', stockController.getStockHistory);


module.exports = router;