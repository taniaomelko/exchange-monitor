const Subscription = require('../models/subscription');

const addSubscription = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email is already subscribed
    const existingSubscription = await Subscription.findOne({ email });

    // If the email is already subscribed, return a 409 Conflict response
    if (existingSubscription) {
      return res.status(409).json({ message: 'Email is already subscribed.' });
    }

    // If the email is not subscribed, create a new subscription
    const subscription = new Subscription({ email });
    await subscription.save();
    res.status(200).json({ message: 'Email subscribed successfully.' });
  } catch (error) {
    console.error('Error subscribing email:', error);
    res.status(500).json({ error: 'Failed to subscribe email.' });
  }
};

module.exports = { addSubscription };
