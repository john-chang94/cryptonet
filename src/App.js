import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Space } from "antd";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cryptocurrencies from "./components/Cryptocurrencies";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coins" element={<Cryptocurrencies />} />
            </Routes>
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default App;
