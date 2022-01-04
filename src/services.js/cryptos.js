import axios from "axios";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "c69f98f65dmshd701837d3cab2e2p189dd6jsn8d7f621d2c1a",
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
