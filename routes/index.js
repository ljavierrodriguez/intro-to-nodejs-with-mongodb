const express = require('express');
const { home } = require('../controllers/main.controller');
const { isVerified } = require('../middleware/isVerified');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "API Rest NodeJS and MongoDB" });
})

router.get('/test', isVerified, home);

module.exports = router;