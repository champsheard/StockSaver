const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require("express-rate-limit");

const registerLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    handler: (req, res) => {
        console.log("LIMIT HIT");
        res.status(429).json({ error: "Too many requests", apiKey: "Error, Too Many Requests. Wait a minute and then try again"  });
        
    }
});


router.post('/register', registerLimiter, authController.register);
router.get('/me/:id', authController.getProfile);

module.exports = router;