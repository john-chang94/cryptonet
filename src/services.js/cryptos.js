import axios from "axios";

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_COINRANKING_HOST,
  "x-rapidapi-key": process.env.REACT_APP_COINRANKING_KEY,
};

const cryptoNewsApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_FREE_NEWS_HOST,
  "x-rapidapi-key": process.env.REACT_APP_FREE_NEWS_KEY,
};

export const getCryptos = async (count) => {
  try {
    const res = await axios.get(
      `https://coinranking1.p.rapidapi.com/coins?limit=${count}`,
      { headers: cryptoApiHeaders }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCrypto = async (coinId) => {
  try {
    const res = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
      { headers: cryptoApiHeaders }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCryptoHistory = async (coinId, timeframe) => {
  try {
    const res = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}/history/${timeframe}`,
      { headers: cryptoApiHeaders }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCryptoNews = async (query, count) => {
  try {
    const res = await axios.get(
      `https://free-news.p.rapidapi.com/v1/search?q=${query}&page_size=${count}&lang=en`,
      { headers: cryptoNewsApiHeaders }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCryptoExchanges = async () => {
  try {
    const res = await axios.get(
      `https://coinranking1.p.rapidapi.com/exchanges`,
      { headers: cryptoApiHeaders }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
