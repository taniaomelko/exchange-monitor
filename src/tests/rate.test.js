const request = require('supertest');
const express = require('express');
const rateRoutes = require('../routes/rateRoutes');
const { fetchExchangeRate } = require('../services/exchangeRateService');

jest.mock('../services/exchangeRateService');

const app = express();
app.use(express.json());
app.use('/api/rate', rateRoutes);

describe('GET /api/rate', () => {
  it('should return the exchange rate', async () => {
    fetchExchangeRate.mockResolvedValue({ rate: 39.00 });

    const res = await request(app).get('/api/rate');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('rate', 39.00);
  });

  it('should return a 500 error if fetching the rate fails', async () => {
    fetchExchangeRate.mockRejectedValue(new Error('Failed to fetch rate'));

    const res = await request(app).get('/api/rate');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Failed to fetch rate');
  });
});
