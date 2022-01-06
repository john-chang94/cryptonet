import React from "react";
import { Row, Col, Collapse } from "antd";
import { useQuery } from "react-query";
import { getCryptoExchanges } from "../services.js/cryptos";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

import Loader from "./Loader";

const Exchanges = () => {
  const { data, isLoading } = useQuery(["cryptoExchanges"], () =>
    getCryptoExchanges()
  );

  if (isLoading) return <Loader />;

  return (
    <div>
      <Row>
        <Col span={6}>
          <strong>Exchanges</strong>
        </Col>
        <Col span={6}>
          <strong>24h Trade Volume</strong>
        </Col>
        <Col span={6}>
          <strong>Markets</strong>
        </Col>
        <Col span={6}>
          <strong>% Change</strong>
        </Col>
      </Row>
      <Collapse>
        {data.data.exchanges.map((exchange) => (
          <Collapse.Panel
            key={exchange.id}
            showArrow={false}
            header={
              <Row className="exchange-panel-container">
                <Col span={6}>
                  <strong>{exchange.rank}</strong>
                  <img
                    src={exchange.iconUrl}
                    className="exchange-image"
                    alt="exchange icon"
                  />
                  <strong>{exchange.name}</strong>
                </Col>
                <Col span={6}>{millify(exchange.volume, { precision: 2 })}</Col>
                <Col span={6}>{exchange.numberOfMarkets}</Col>
                <Col span={6}>{millify(exchange.marketShare)}%</Col>
              </Row>
            }
          >
            {HTMLReactParser(exchange.description || "")}
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Exchanges;
