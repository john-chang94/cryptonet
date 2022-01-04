import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import Loader from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrices = [];
  const coinTimestamps = [];

  if (!coinHistory) return <Loader />

  for (let i = 0; i < coinHistory.data.history.length; i++) {
    coinPrices.push(coinHistory.data.history[i].price);
  }

  for (let i = 0; i < coinHistory.data.history.length; i++) {
    coinTimestamps.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamps,
    datasets: [
      {
        label: "USD",
        data: coinPrices,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <div>
      <Row className="chart-header">
          <Typography.Title level={2}>
              {coinName} Price Chart
          </Typography.Title>
          <Col className="price-container">
              <Typography.Title level={5}>
                  {coinHistory.data.change}%
              </Typography.Title>&nbsp;&nbsp;
              <Typography.Title level={5}>
                  Current Price: ${currentPrice}
              </Typography.Title>
          </Col>
      </Row>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
