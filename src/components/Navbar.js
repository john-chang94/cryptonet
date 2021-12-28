import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
} from "@ant-design/icons/lib/icons";

import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <img src={icon} alt="cryptonet logo" />
        <h2>
          <Link to="/" className="nav-links">CryptoNet</Link>
        </h2>
      </div>
      <Menu theme="dark">
        <Menu.Item key={"1"} className="nav-links" icon={<HomeOutlined />}>
          <Link to="/" className="nav-links">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key={"2"} className="nav-links" icon={<FundOutlined />}>
          <Link to="/coins" className="nav-links">
            Cryptocurrencies
          </Link>
        </Menu.Item>
        <Menu.Item
          key={"3"}
          className="nav-links"
          icon={<MoneyCollectOutlined />}
        >
          <Link to="/exchanges" className="nav-links">
            Exchanges
          </Link>
        </Menu.Item>
        <Menu.Item key={"4"} className="nav-links" icon={<BulbOutlined />}>
          <Link to="/news" className="nav-links">
            News
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
