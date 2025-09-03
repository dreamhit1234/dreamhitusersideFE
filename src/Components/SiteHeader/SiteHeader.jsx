import React, { useState } from "react";
import { Drawer, Avatar, Button, Badge } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  WalletOutlined as WalletIcon,
  BellOutlined,
  LockOutlined,
  PoweroffOutlined,
  BankOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TransactionModal from "../Modals/TransactionModal/TransactionModal";
import ChangePasswordModal from "../Modals/ChangePasswordModal/ChangePassword";
import RulesModal from "../Modals/RulesModal/RulesModal";
import NotificationModal from "../Modals/NotificationModal/NotificationModal"; 
import "./SiteHeader.scss";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [cpModalOpen, setCpModalOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);

  // ✅ Notifications (dynamic array)
  const [notifications, setNotifications] = useState([
    "Welcome to Dream-Hit!",
    "Your last deposit was successful.",
    "Match starts at 8:00 PM.",
    "New rules have been updated.",
    "Withdrawal request processed.",
    "Bonus credited to your account.",
    "Upcoming match reminder.",
  ]);

  // ✅ Unread count
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const walletAmount = 200;
  const navigate = useNavigate();

  // ✅ Open notification modal & reset unread
  const handleOpenNotifications = () => {
    setNotifyModalOpen(true);
    setUnreadCount(0); // reset once opened
  };

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="left">
          <MenuOutlined className="icon" onClick={() => setMenuOpen(true)} />
          <span className="logo">Dream-Hit</span>
        </div>

        <div className="right">
          {/* ✅ Bell with badge */}
          <Badge count={unreadCount} size="small" offset={[-2, 6]}>
            <BellOutlined className="icon" onClick={handleOpenNotifications} />
          </Badge>
          <div className="wallet">
            <WalletIcon style={{ marginRight: 6 }} />
            <span className="wallet-amount">₹ {walletAmount}/-</span>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <Drawer
        title={null}
        placement="left"
        width="60%"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        className="custom-drawer"
      >
        {/* Profile */}
        <div className="profile-section">
          <Avatar size={50} icon={<UserOutlined />} />
          <span className="profile-name">Victory Venkatesh</span>
        </div>

        {/* Wallet Info */}
        <div className="drawer-wallet">
          <WalletIcon style={{ marginRight: 6 }} />
          <span className="wallet-amount">Wallet : ₹ {walletAmount}/-</span>
        </div>

        {/* Deposit & Withdraw */}
        <div className="action-buttons">
          <button className="btn-deposit" onClick={() => navigate("/deposit")}>
            Deposit
          </button>
         <button className="btn-withdraw" onClick={() => navigate("/withdrawal")}>
            Deposit
          </button>
        </div>

        {/* Transactions */}
        <Button
          icon={<BankOutlined />}
          className="menu-btn"
          block
          onClick={() => setTxModalOpen(true)}
        >
          Transactions
        </Button>

        {/* Change Password */}
        <Button
          icon={<LockOutlined />}
          className="menu-btn"
          block
          onClick={() => setCpModalOpen(true)}
        >
          Change Password
        </Button>

        {/* Rules */}
        <Button
          icon={<BookOutlined />}
          className="menu-btn"
          block
          onClick={() => setRulesModalOpen(true)}
        >
          Rules
        </Button>

        {/* Logout */}
        <Button
          danger
          icon={<PoweroffOutlined />}
          className="menu-btn"
          block
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Drawer>

      {/* Transactions Modal */}
      <TransactionModal
        open={txModalOpen}
        onClose={() => setTxModalOpen(false)}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={cpModalOpen}
        onClose={() => setCpModalOpen(false)}
      />

      {/* Rules Modal */}
      <RulesModal open={rulesModalOpen} onClose={() => setRulesModalOpen(false)} />

      {/* ✅ Notification Modal */}
      <NotificationModal
        open={notifyModalOpen}
        onClose={() => setNotifyModalOpen(false)}
        notifications={notifications}
      />
    </>
  );
}
