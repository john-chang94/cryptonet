import React, { useState, useEffect } from "react";
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
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const coinPrices = [];
  const coinTimestamps = [];
  const coinTimestampsSmall = [];

  for (let i = 0; i < coinHistory.length; i++) {
    coinPrices.push(coinHistory[i].rate);
  }

  // Labels for large screens (with timestamps)
  for (let i = 0; i < coinHistory.length; i++) {
    coinTimestamps.push(
      new Date(coinHistory[i].date).toLocaleString().replace(":00", "")
    );
  }

  // Labels for smaller screens (only dates)
  for (let i = 0; i < coinHistory.length; i++) {
    coinTimestampsSmall.push(new Date(coinHistory[i].date).toLocaleDateString());
  }

  const data = {
    labels: screenSize > 768 ? coinTimestamps : coinTimestampsSmall,
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

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  return (
    <div>
      <Row className="chart-header">
        <Typography.Title level={2}>{coinName} Price Chart</Typography.Title>
        <Col className="price-container">
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
