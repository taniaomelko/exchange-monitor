const cron = require('node-cron');
const { sendEmails } = require('../controllers/sendEmailsController');

// Schedule the email sending task to run daily at 09:00 AM
cron.schedule('0 9 * * *', () => {
  sendEmails();
});
