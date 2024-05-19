const axios = require('axios');
const apiUrl = process.env.EXCHANGE_RATE_API_URL;

const fetchExchangeRate = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.rates.UAH;
  } catch (error) {
    throw new Error('Failed to fetch exchange rate');
  }
};

module.exports = { fetchExchangeRate };
