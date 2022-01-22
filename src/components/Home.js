import React from "react";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";
import { useQuery } from "react-query";
import {
  getCryptoOverview,
  getCryptoOverviewHistory,
} from "../services.js/cryptos";
import millify from "millify";

import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";
import News from "./News";

const Home = () => {
  const { data: overview, isLoading } = useQuery(["overview"], () =>
    getCryptoOverview()
  );
  const { data: overviewHistory } = useQuery(["overviewHistory"], () =>
    getCryptoOverviewHistory()
  );

  if (isLoading || !overview) return <Loader />;

  const lastDay = overviewHistory[overviewHistory.length - 1].cap;
  const firstDay = overviewHistory[0].cap;
  const marketCapDifference = (lastDay / firstDay - 1) * 100;

  return (
    <div>
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={`${millify(overview.cap, { precision: 2 })} (${millify(
              marketCapDifference,
              { precision: 2 }
            )}%)`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Liquidity"
            value={millify(overview.liquidity, { precision: 2 })}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(overview.volume, { precision: 2 })}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="BTC Dominance"
            value={`${millify(overview.btcDominance * 100, { precision: 2 })}%`}
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
        <Typography.Title level={3}>Latest Crypto News</Typography.Title>
        <Typography.Title level={3}>
          <Link to="/news">Show More</Link>
        </Typography.Title>
      </div>
      <News simplified />
    </div>
  );
};

export default Home;
