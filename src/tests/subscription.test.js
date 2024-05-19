const request = require('supertest');
const express = require('express');
const { addSubscription } = require('../controllers/subscriptionController');
const Subscription = require('../models/subscription');

jest.mock('../models/subscription');

const app = express();
app.use(express.json());
app.post('/api/subscribe', addSubscription);

describe('POST /api/subscribe', () => {
  it('should subscribe a new email', async () => {
    const email = 'test@example.com';
    Subscription.findOne.mockResolvedValue(null);
    Subscription.prototype.save = jest.fn().mockResolvedValue({ email });

    const res = await request(app)
      .post('/api/subscribe')
      .send({ email });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Email subscribed successfully.');
  });

  it('should return 409 if email is already subscribed', async () => {
    const email = 'test@example.com';
    Subscription.findOne.mockResolvedValue({ email });

    const res = await request(app)
      .post('/api/subscribe')
      .send({ email });

    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('message', 'Email is already subscribed.');
  });

  it('should return 500 if there is a server error', async () => {
    const email = 'test@example.com';
    Subscription.findOne.mockRejectedValue(new Error('Server error'));

    const res = await request(app)
      .post('/api/subscribe')
      .send({ email });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Failed to subscribe email.');
  });
});
