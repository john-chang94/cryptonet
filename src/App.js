import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Space, Typography } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import Exchanges from "./components/Exchanges";
import News from "./components/News";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/coins" element={<Cryptocurrencies />} />
                <Route path="/coin/:rank/:code" element={<CryptoDetails />} />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route path="/news" element={<News />} />
              </Routes>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Text className="footer-title">
              © 2022 CryptoNet
            </Typography.Text>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
