import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { parseISO, formatDistance } from "date-fns";
import { useQuery } from "react-query";
import { getCryptoNews } from "../services.js/cryptos";

import Loader from "./Loader";

const News = ({ simplified, query = "cryptocurrency" }) => {
  const count = simplified ? 6 : 15;
  const { data, isLoading } = useQuery(["cryptoNews", query, count], () =>
    getCryptoNews(query, count)
  );

  // Format article's published date with suffix
  const formatTime = (date) => {
    const time = formatDistance(
      new Date(parseISO(date)),
      new Date(),
      { addSuffix: true }
    );

    return time;
  };

  const defaultImage =
    "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

  if (isLoading || !data) return <Loader />;

  return (
    <div>
      <Row gutter={[24, 24]}>
        {data?.articles.map((article) => (
          <Col xs={24} sm={12} lg={8} key={article.id}>
            <Card hoverable className="news-card">
              <a href={article.link} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Typography.Title level={5} className="news-title">
                    {article.title}
                  </Typography.Title>
                  <img
                    src={article.media ? article.media : defaultImage}
                    alt="cryptocurrency news thumbnail"
                  />
                </div>
                <div className="news-times-container">
                  <em>{article.clean_url}</em><br />
                  <em>{formatTime(article.published_date)}</em>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
