import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { subHours, subDays, subYears } from "date-fns";
import { Col, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import { useQuery } from "react-query";
import { getCrypto, getCryptoHistory } from "../services.js/cryptos";
import Loader from "./Loader";
import LineChart from "./LineChart";
import News from "./News";

// Default 24h timeframe for coin history on init load
const today = new Date(Date.now());
const yesterday = new Date(subDays(today, 1));

const CryptoDetails = () => {
  const { rank, code } = useParams();
  const [timeframe, setTimeframe] = useState("24h");
  const [startTime, setStartTime] = useState(yesterday.getTime());
  // eslint-disable-next-line no-unused-vars
  const [endTime, setEndTime] = useState(today.getTime());

  const { data: coin, isLoading } = useQuery(["crypto", code], () =>
    getCrypto(code)
  );
  const { data: coinHistory } = useQuery(
    ["cryptoHistory", code, startTime, endTime],
    () => getCryptoHistory(code, startTime, endTime)
  );

  const times = ["3h", "24h", "7d", "30d", "3m", "6m", "1y", "5y"];

  useEffect(() => {
    // Set timeframe for line chart
    switch (timeframe) {
      case "3h":
        setStartTime(new Date(subHours(endTime, 3)).getTime());
        break;
      case "24h":
        setStartTime(new Date(subHours(endTime, 24)).getTime());
        break;
      case "7d":
        setStartTime(new Date(subDays(endTime, 7)).getTime());
        break;
      case "30d":
        setStartTime(new Date(subDays(endTime, 30)).getTime());
        break;
      case "3m":
        setStartTime(new Date(subDays(endTime, 90)).getTime());
        break;
      case "6m":
        setStartTime(new Date(subDays(endTime, 180)).getTime());
        break;
      case "1y":
        setStartTime(new Date(subYears(endTime, 1)).getTime());
        break;
      case "5y":
        setStartTime(new Date(subYears(endTime, 5)).getTime());
        break;
      default:
        return;
    }
  }, [timeframe, endTime]);

  // Placed before assigning stats array because data needs to be fetched
  if (isLoading || !coinHistory) return <Loader />;

  const stats = [
    {
      title: "Price in USD",
      value: `$${millify(coin.rate, { precision: 2 })}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$${millify(coin.volume, { precision: 2 })}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$${millify(coin.cap, { precision: 2 })}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high",
      value: `$${millify(coin.allTimeHighUSD, { precision: 2 })}`,
      icon: <TrophyOutlined />,
    },
    {
      title: "Number Of Markets",
      value: coin.markets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coin.exchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Total Supply",
      value: `${coin.maxSupply ? millify(coin.maxSupply) : "N/A"}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${
        coin.circulatingSupply ? millify(coin.circulatingSupply) : "N/A"
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div>
      <div className="coin-heading-container">
        <Typography.Title level={2}>
          {coin.name} ({coinHistory.code}) Price
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
        coinHistory={coinHistory.history}
        currentPrice={millify(coin.rate, { precision: 2 })}
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

      <div className="coin-news-heading">
        <Typography.Title level={3}>{coin.name} News</Typography.Title>
        <News simplified query={`${coin.name} cryptocurrency`} />
      </div>
    </div>
  );
};

export default CryptoDetails;
