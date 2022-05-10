import React from "react";
import { useQuery } from "react-query";
import { getCryptos } from "../services.js/cryptos";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";

import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const { data, isLoading } = useQuery(["cryptos", count], () =>
    getCryptos(count)
  );

  if (isLoading) return <Loader />;

  return (
    <div>
      <Row gutter={[24, 24]}>
        {data.map((crypto, i) => (
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
