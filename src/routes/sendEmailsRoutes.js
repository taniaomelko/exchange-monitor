const express = require('express');
const { sendEmails } = require('../controllers/sendEmailsController');

const router = express.Router();

router.post('/', sendEmails);

module.exports = router;
