require("dotenv").config();
const axios = require("axios");

const cryptoApiHeaders = {
  "x-access-token": process.env.REACT_APP_COINRANKING_KEY,
};

module.exports = (app) => {
  //   app.use(function (req, res, next) {
  //     res.header("Access-Control-Allow-Origin", "x-access-token");
  //     res.header(
  //       "Access-Control-Allow-Headers",
  //       "Origin, X-Requested-With, Content-Type, Accept"
  //     );
  //     next();
  //   });

  app.get("/api/cryptos", async (req, res) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    try {
      const { count } = req.query;
      const res = await axios.get(
        `https://api.coinranking.com/v2/coins?limit=${count}`,
        {
          headers: cryptoApiHeaders,
        }
      );
        const newData = res.data.stats
        console.log('NEW DATAAAAA', newData);

      res.json(newData);
    } catch (err) {
      res.send(err);
    }
  });
};
