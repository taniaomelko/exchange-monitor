const express = require('express');
const { addSubscription } = require('../controllers/subscriptionController');

const router = express.Router();

router.post('/', addSubscription);

module.exports = router;
