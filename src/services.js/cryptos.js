import axios from "axios";
import { subDays } from "date-fns";

const cryptoNewsApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_FREE_NEWS_HOST,
  "x-rapidapi-key": process.env.REACT_APP_FREE_NEWS_KEY,
};

const headerConfig = {
  "content-type": "application/json",
  "x-api-key": process.env.REACT_APP_LIVECOINWATCH_KEY,
};

export const getCryptoOverview = async () => {
  try {
    const body = { currency: "USD" };
    const res = await axios.post(
      `https://api.livecoinwatch.com/overview`,
      body,
      { headers: headerConfig }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCryptoOverviewHistory = async () => {
  try {
    const previousDay = subDays(new Date(Date.now()), 1);
    const body = {
      currency: "USD",
      start: new Date(previousDay).getTime(),
      end: new Date(Date.now()).getTime(),
    };

    const res = await axios.post(
      `https://api.livecoinwatch.com/overview/history`,
      body,
      { headers: headerConfig }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
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

export const getCrypto = async (code) => {
  try {
    const body = {
      currency: "USD",
      code: code,
      meta: true,
    };
    const res = await axios.post(
      `https://api.livecoinwatch.com/coins/single`,
      body,
      { headers: headerConfig }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCryptoHistory = async (code, timeStart, timeEnd) => {
  try {
    const body = {
      currency: "USD",
      code: code,
      start: timeStart,
      end: timeEnd,
      meta: true,
    };

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
    const body = {
      currency: "USD",
      sort: "volume",
      order: "descending",
      offset: 0,
      limit: 100,
      meta: true,
    };
    const res = await axios.post(
      `https://api.livecoinwatch.com/exchanges/list`,
      body,
      { headers: headerConfig }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
