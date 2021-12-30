import React from "react";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";
import Cryptocurrencies from "./Cryptocurrencies";

const Home = () => {
  return (
    <div>
      <Typography.Title level={2} className="heading">
          Global Crypto Stats
      </Typography.Title>
      <Row>
          <Col span={12}>
              <Statistic title="Total Cryptocurrencies" value={`10000`} />
          </Col>
          <Col span={12}>
              <Statistic title="Total Exchanges" value={`350`} />
          </Col>
          <Col span={12}>
              <Statistic title="Total Market Cap" value={`1000000`} />
          </Col>
          <Col span={12}>
              <Statistic title="Total 24h Volume" value={`130B`} />
          </Col>
          <Col span={12}>
              <Statistic title="Total Markets" value={`82000`} />
          </Col>
      </Row>

      <Cryptocurrencies />
    </div>
  );
};

export default Home;
