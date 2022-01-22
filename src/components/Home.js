import React from "react";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";
import { useQuery } from "react-query";
import { getCryptos } from "../services.js/cryptos";
import millify from "millify";

import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";
import News from "./News";

const Home = () => {
  const { data, isLoading } = useQuery(["cryptos"], () => getCryptos(10));
  const globalStats = data?.data?.stats;
  console.log(data);

  if (isLoading || !globalStats) return <Loader />;

  return (
    <div>
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={globalStats.totalExchanges}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap, { precision: 2 })}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume, { precision: 2 })}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets, { precision: 2 })}
          />
        </Col>
      </Row>

      <div className="home-cryptos-label">
        <Typography.Title level={3}>Top 10 Cryptocurrencies</Typography.Title>
        <Typography.Title level={3}>
          <Link to="/coins">Show More</Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies simplified />
      
      <div className="home-news-label">
        <Typography.Title level={3}>
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={3}>
          <Link to="/news">Show More</Link>
        </Typography.Title>
      </div>
      <News simplified />
    </div>
  );
};

export default Home;
