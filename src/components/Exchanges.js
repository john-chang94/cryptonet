import React from "react";
import { Table } from "antd";
import { useQuery } from "react-query";
import { getCryptoExchanges } from "../services.js/cryptos";
import millify from "millify";

import Loader from "./Loader";

const Exchanges = () => {
  const { data: exchanges, isLoading } = useQuery(["cryptoExchanges"], () =>
    getCryptoExchanges()
  );

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
      centralized: exchanges[i].centralized ? "Yes" : "No"
    };

    data.push(obj);
  }

  return (
    <div>
      <Table dataSource={data} columns={columns} pagination={false} />
    </div>
  );
};

export default Exchanges;
