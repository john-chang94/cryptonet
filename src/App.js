import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Space } from "antd";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cryptocurrencies from "./components/Cryptocurrencies";
import { QueryClient, QueryClientProvider } from "react-query";
import CryptoDetails from "./components/CryptoDetails";

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
                <Route path="/coin/:coinId" element={<CryptoDetails />} />
              </Routes>
            </div>
          </Layout>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
