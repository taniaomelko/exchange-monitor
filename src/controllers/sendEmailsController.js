const Subscription = require('../models/subscription');
const nodemailer = require('nodemailer');
const { fetchExchangeRate } = require('../services/exchangeRateService');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmails = async (req, res) => {
  try {
    const rate = await fetchExchangeRate();

    // Get the list of subscribed emails
    const subscriptions = await Subscription.find();

    // Send emails to each subscribed address
    const emailPromises = subscriptions.map((subscription) => {
      const mailOptions = {
        from: process.env.EMAIL,
        to: subscription.email,
        subject: 'Currency Exchange Rate Update',
        text: `Current exchange rate of USD to UAH: ${rate}`,
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);

    res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails.' });
  }
};

module.exports = { sendEmails };
