const express = require('express');
const { getRate } = require('../controllers/rateController');

const router = express.Router();

router.get('/', getRate);

module.exports = router;
