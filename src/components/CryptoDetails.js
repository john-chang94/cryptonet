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

  if (isLoading) return <Loader />;

  return (
    <Col>
      <Col className="coin-heading-container">
        <Typography.Title level={2}>
          {coin.name} ({coin.slug}) Price
        </Typography.Title>
        <p>
          {coin.name} live price in US dollars. View value statistics, marketcap
          and supply.
        </p>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
