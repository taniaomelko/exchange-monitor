const { fetchExchangeRate } = require('../services/exchangeRateService');

const getRate = async (req, res) => {
  try {
    const rate = await fetchExchangeRate();
    res.json(rate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rate' });
  }
};

module.exports = { getRate };
