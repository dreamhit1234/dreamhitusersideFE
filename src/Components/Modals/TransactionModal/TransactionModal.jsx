import React, { useState } from "react";
import { Modal, Button, Table, Tag } from "antd";
import "./TransactionModal.scss"; // ✅ Import SCSS

export default function TransactionModal({ open, onClose }) {
  const [filter, setFilter] = useState("all");

  const allTransactions = [
    { id: 1, type: "deposit", amount: 500, date: "2025-08-19 10:30 AM" },
    { id: 2, type: "withdraw", amount: 200, date: "2025-08-18 04:15 PM" },
    { id: 3, type: "deposit", amount: 1000, date: "2025-08-18 01:00 PM" },
    { id: 4, type: "withdraw", amount: 300, date: "2025-08-17 06:30 PM" },
    { id: 5, type: "deposit", amount: 700, date: "2025-08-16 11:00 AM" },
    { id: 6, type: "deposit", amount: 1200, date: "2025-08-15 09:45 AM" },
    { id: 7, type: "withdraw", amount: 500, date: "2025-08-14 05:15 PM" },
    { id: 8, type: "deposit", amount: 1500, date: "2025-08-13 03:10 PM" },
    { id: 9, type: "withdraw", amount: 400, date: "2025-08-12 07:00 PM" },
    { id: 10, type: "deposit", amount: 900, date: "2025-08-11 12:30 PM" },
  ];

  const filtered = filter === "all"
    ? allTransactions
    : allTransactions.filter((tx) => tx.type === filter);

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      render: (text) =>
        text === "deposit" ? (
          <Tag color="green">Deposit</Tag>
        ) : (
          <Tag color="red">Withdraw</Tag>
        ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amt) => `₹ ${amt}/-`,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
  ];

  return (
    <Modal
      title="Last 10 Transactions"
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      className="transactions-modal" // ✅ Apply SCSS
    >
      <div className="filter-buttons">
        <Button
          type={filter === "all" ? "primary" : "default"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          type={filter === "deposit" ? "primary" : "default"}
          onClick={() => setFilter("deposit")}
        >
          Deposit
        </Button>
        <Button
          type={filter === "withdraw" ? "primary" : "default"}
          onClick={() => setFilter("withdraw")}
        >
          Withdraw
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={false}
        size="small"
         showHeader={false} 
      />
    </Modal>
  );
}
