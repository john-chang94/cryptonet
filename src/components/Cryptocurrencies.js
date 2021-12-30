import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getCryptos } from "../services.js/cryptos";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";

const Cryptocurrencies = () => {
  const count = 10;
  const { data, isLoading } = useQuery(["cryptos", count], () =>
    getCryptos(count)
  );
  const [cryptos, setCryptos] = useState(null);

  useEffect(() => {
    setCryptos(data?.data?.coins);
  }, [data]);

  if (isLoading) return "Loading...";

  return (
    <div>
      <Row gutter={[24, 24]}>
        {cryptos &&
          cryptos.map((crypto) => (
            <Col key={crypto.id} xl={6} lg={8} sm={12} xs={24}>
              <Link to={`/coin/${crypto.id}`}>
                <Card
                    title={`${crypto.rank} ${crypto.name}`}
                    extra={<img src={crypto.iconUrl} className="crypto-icon" alt="cryptocurrency icon" />}
                    hoverable
                >
                  <p>Price: {millify(crypto.price, { precision: 2 })}</p>
                  <p>Market Cap: {millify(crypto.marketCap, { precision: 2 })}</p>
                  <p>24h Change: {millify(crypto.change, { precision: 2 })}</p>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;
