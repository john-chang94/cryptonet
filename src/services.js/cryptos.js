import axios from "axios";

const cryptoApiHeaders = {
  "x-access-token": process.env.REACT_APP_COINRANKING_KEY,
};

const cryptoNewsApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_FREE_NEWS_HOST,
  "x-rapidapi-key": process.env.REACT_APP_FREE_NEWS_KEY,
};

const headerConfig = {
  "content-type": "application/json",
  "x-api-key": process.env.REACT_APP_LIVECOINWATCH_KEY,
};

export const getCryptos = async (count) => {
  try {
    const body = {
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: count,
      meta: true,
    };

    const res = await axios.post(
      `https://api.livecoinwatch.com/coins/list`,
      body,
      { headers: headerConfig }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCrypto = async (coinId) => {
  try {
    const res = await axios.get(
      `https://api.coinranking.com/v2/coin/${coinId}`,
      { headers: cryptoApiHeaders }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCryptoHistory = async (coinId, timeStart, timeEnd) => {
  try {
    const body = {
      currency: "USD",
      code: "BTC",
      start: new Date(2022, 0, 12).getTime(),
      end: new Date(2022, 0, 21).getTime(),
      meta: true,
    };
    console.log(new Date(body.end));

    const res = await axios.post(
      `https://api.livecoinwatch.com/coins/single/history`,
      body,
      { headers: headerConfig }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCryptoNews = async (query, count) => {
  try {
    const res = await axios.get(`https://free-news.p.rapidapi.com/v1/search`, {
      params: { q: query, page_size: count, lang: "en" },
      headers: cryptoNewsApiHeaders,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCryptoExchanges = async () => {
  try {
    const res = await axios.get(`https://api.coinranking.com/v2/exchanges`, {
      headers: cryptoApiHeaders,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
