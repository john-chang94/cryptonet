import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useQuery } from "react-query";
import { getCryptoExchanges } from "../services.js/cryptos";
import millify from "millify";

import Loader from "./Loader";

const Exchanges = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { data: exchanges, isLoading } = useQuery(["cryptoExchanges"], () =>
  getCryptoExchanges()
  );
  
  const handleResize = () => {
    setScreenSize(window.innerWidth);
  }

  // Decrease padding in table cells in smaller screens
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  if (isLoading) return <Loader />;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
    },
    {
      title: "Visitors",
      dataIndex: "visitors",
      key: "visitors",
    },
    {
      title: "Centralized",
      dataIndex: "centralized",
      key: "centralized",
    }
  ];

  // Push fetched data into new array with millified numbers for table
  const data = [];
  for (let i = 0; i < exchanges.length; i++) {
    let obj = {
      name: `${i === 0 ? ++i : i}. ${exchanges[i].name}`, // index for numbering displayed rows
      volume: millify(exchanges[i].volume, { precision: 2 }),
      visitors: millify(exchanges[i].visitors, { precision: 2 }),
      centralized: exchanges[i].centralized ? "Yes" : "No",
      key: i
    };

    data.push(obj);
  }

  return (
    <div className={`${screenSize < 450 && "exchanges"}`}>
      <Table dataSource={data} columns={columns} pagination={false} />
    </div>
  );
};

export default Exchanges;
