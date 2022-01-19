import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import { useQuery } from "react-query";
import { getCrypto, getCryptoHistory } from "../services.js/cryptos";
import Loader from "./Loader";
import LineChart from "./LineChart";
import News from "./News";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeframe, setTimeframe] = useState("24h");

  const { data, isLoading } = useQuery(["crypto", coinId], () =>
    getCrypto(coinId)
  );
  const { data: coinHistory } = useQuery(
    ["cryptoHistory", coinId, timeframe],
    () => getCryptoHistory(coinId, timeframe)
  );

  const coin = data?.data?.coin;

  // Placed before assigning stats array because undefined error
  if (isLoading) return <Loader />;

  const stats = [
    {
      title: "Price in USD",
      value: `$${coin.price && millify(coin.price, { precision: 2 })}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coin.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$${coin.volume && millify(coin.volume, { precision: 2 })}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$${coin.marketCap && millify(coin.marketCap, { precision: 2 })}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high",
      value: `$${millify(coin.allTimeHigh.price, { precision: 2 })}`,
      icon: <TrophyOutlined />,
    },
    {
      title: "Number Of Markets",
      value: coin.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coin.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: coin.supply.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `${millify(coin.supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${millify(coin.supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  const times = ["3h", "24h", "7d", "30d", "1y", "5y"];

  return (
    <div>
      <div className="coin-heading-container">
        <Typography.Title level={2}>
          {coin.name} ({coin.symbol}) Price
        </Typography.Title>
        <p>
          {coin.name} live price in US dollars. View value statistics, marketcap
          and supply.
        </p>
      </div>

      <Typography.Title level={5}>Change timeframe</Typography.Title>
      <Select
        defaultValue={timeframe}
        className="select-timeframe"
        onChange={(value) => setTimeframe(value)}
      >
        {times.map((time) => (
          <Select.Option key={time}>{time}</Select.Option>
        ))}
      </Select>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coin.price, { precision: 2 })}
        coinName={coin.name}
      />

      <div className="stats-container">
        <Typography.Title level={3} className="coin-details-heading">
          {coin.name} Statistics
        </Typography.Title>
        {stats.map(({ icon, title, value }) => (
          <Col span={24} key={title} className="coin-stats">
            <div>
              <Typography.Text>{icon}</Typography.Text>
              <Typography.Text className="stat">{title}:&nbsp;</Typography.Text>
            </div>
            <div>
              <Typography.Text>{value}</Typography.Text>
            </div>
          </Col>
        ))}
      </div>

      <Row className="coin-desc-container">
        <Col sm={24} lg={10}>
          <Typography.Title level={3} className="coin-details-heading">
            What is {coin.name}?
          </Typography.Title>
          {coin.description && HTMLReactParser(coin.description)}
        </Col>
        <Col sm={24} lg={{ span: 10, offset: 2 }} className="coin-links">
          <Typography.Title level={3} className="coin-details-heading">
            {coin.name} Links
          </Typography.Title>
          {coin.links.map((link, i) => (
            <Row key={i} className="coin-link">
              <Typography.Title level={5}>{link.type}</Typography.Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Row>

      <div className="coin-news-heading">
        <Typography.Title level={3}>
          {coin.name} News
        </Typography.Title>
        <News simplified query={`${coin.name} crypto`} />
      </div>
    </div>
  );
};

export default CryptoDetails;
