const request = require('supertest');
const express = require('express');
const { sendEmails } = require('../controllers/sendEmailsController');
const Subscription = require('../models/subscription');
const { fetchExchangeRate } = require('../services/exchangeRateService');

jest.mock('../models/subscription');
jest.mock('../services/exchangeRateService');

const app = express();
app.use(express.json());
app.post('/api/sendEmails', sendEmails);

describe('POST /api/sendEmails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send emails to subscribed users', async () => {
    const mockRate = 40;
    const mockSubscriptions = [{ email: 'test1@example.com' }, { email: 'test2@example.com' }];
    const { mock } = require('nodemailer');

    fetchExchangeRate.mockResolvedValue(mockRate);
    Subscription.find.mockResolvedValue(mockSubscriptions);

    const response = await request(app).post('/api/sendEmails');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Emails sent successfully.');
    expect(fetchExchangeRate).toHaveBeenCalled();
    expect(Subscription.find).toHaveBeenCalled();

    const sentEmails = mock.getSentMail();
    expect(sentEmails.length).toBe(mockSubscriptions.length);
    mockSubscriptions.forEach((subscription, index) => {
      expect(sentEmails[index].to).toBe(subscription.email);
      expect(sentEmails[index].subject).toBe('Currency Exchange Rate Update');
      expect(sentEmails[index].text).toBe(`Current exchange rate of USD to UAH: ${mockRate}`);
    });
  });

  it('should return 500 if an error occurs', async () => {
    const mockError = new Error('Something went wrong');

    fetchExchangeRate.mockRejectedValue(mockError);

    const response = await request(app).post('/api/sendEmails');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to send emails.');
    expect(fetchExchangeRate).toHaveBeenCalled();
  });
});
