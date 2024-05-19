const Subscription = require('../models/subscription');

// Controller to add a subscription
const addSubscription = async (req, res) => {
  const { email } = req.body;

  try {
    const existingSubscription = await Subscription.findOne({ email });

    if (existingSubscription) {
      return res.status(409).json({ message: 'Email is already subscribed.' });
    }

    const subscription = new Subscription({ email });
    await subscription.save();
    res.status(200).json({ message: 'Email subscribed successfully.' });
  } catch (error) {
    console.error('Error subscribing email:', error);
    res.status(500).json({ error: 'Failed to subscribe email.' });
  }
};

module.exports = { addSubscription };
