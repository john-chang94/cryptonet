import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getCryptos } from "../services.js/cryptos";
import { Card, Row, Col, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";

import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  // Fetch cryptos using react-query
  const { data, isLoading } = useQuery(["cryptos", count], () =>
    getCryptos(count)
  );
  const [cryptos, setCryptos] = useState(null);
  const [search, setSearch] = useState("");

  // Filter through list with user's search term
  useEffect(() => {
    const filtered = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    setCryptos(filtered);
  }, [search]);

  // Set initial results for crypto list
  useEffect(() => {
    setCryptos(data?.data?.coins);
  }, [data]);

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
          cryptos.map((crypto) => (
            <Col key={crypto.id} xl={6} lg={8} sm={12} xs={24}>
              <Link to={`/coin/${crypto.id}`}>
                <Card
                  title={`${crypto.rank} ${crypto.name}`}
                  extra={
                    <img
                      src={crypto.iconUrl}
                      className="crypto-icon"
                      alt="cryptocurrency icon"
                    />
                  }
                  hoverable
                >
                  <p>Price: {millify(crypto.price, { precision: 2 })}</p>
                  <p>
                    Market Cap: {millify(crypto.marketCap, { precision: 2 })}
                  </p>
                  <p>24h Change: {millify(crypto.change, { precision: 2 })}%</p>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;
