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
import { getCrypto } from "../services.js/cryptos";
import Loader from "./Loader";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isLoading } = useQuery(["crypto", coinId], () =>
    getCrypto(coinId)
  );
  console.log(data);
  const coin = data?.data?.coin;

  const stats = [
    {
      title: "Price to USD",
      value: `$${coin.price && millify(coin.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coin.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$${coin.volume && millify(coin.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$${coin.marketCap && millify(coin.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high (daily avg.)",
      value: `$${millify(coin.allTimeHigh.price)}`,
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
      value: coin.approvedSupply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `${millify(coin.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${millify(coin.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="coin-heading-container">
        <Typography.Title level={2}>
          {coin.name} ({coin.slug}) Price
        </Typography.Title>
        <p>
          {coin.name} live price in US dollars. View value statistics, marketcap
          and supply.
        </p>
      </div>

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
          {HTMLReactParser(coin.description)}
        </Col>
        <Col sm={24} lg={10} offset={2}>
          <Typography.Title level={3} className="coin-details-heading">
            {coin.name} Links
          </Typography.Title>
          {coin.links.map((link, i) => (
            <Row key={i} className="coin-link-container">
              <Typography.Title level={5}>{link.type}</Typography.Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default CryptoDetails;
