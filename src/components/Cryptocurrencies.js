/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getCryptos } from "../services.js/cryptos";
import { Card, Row, Col, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";

import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [cryptos, setCryptos] = useState(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery(["cryptos", count], () =>
    getCryptos(count)
  );
  
  // Filter through list with user's search term
  useEffect(() => {
    const filtered = cryptos?.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    );
    
    setCryptos(filtered);
  }, [search]);
  
  // Set initial results for crypto list
  useEffect(() => {
    if (!isLoading) setCryptos(data);
  }, [isLoading]);
  
  if (isLoading) return <Loader />;

  return (
    <div>
      {!simplified && (
        <>
          <Typography.Title level={3}>
            Search for a cryptocurrency
          </Typography.Title>
          <div className="crypto-search">
            <Input
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </>
      )}
      <Row gutter={[24, 24]}>
        {cryptos &&
          cryptos.map((crypto, i) => (
            <Col key={crypto.code} xl={6} lg={8} sm={12} xs={24}>
              <Link to={`/coin/${++i}/${crypto.code}`}>
                <Card
                  title={`${++i}. ${crypto.name}`}
                  extra={
                    <img
                      src={crypto.png32}
                      className="crypto-icon"
                      alt="cryptocurrency icon"
                    />
                  }
                  hoverable
                >
                  <p>Price: {`$${millify(crypto.rate, { precision: 2 })}`}</p>
                  <p>Market Cap: {millify(crypto.cap, { precision: 2 })}</p>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;
