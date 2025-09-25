import React, { useState, useEffect } from "react";
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

  // ✅ User state (from localStorage)
  const [user, setUser] = useState(null);

  // Notifications
  const [notifications] = useState([
    "Welcome to Dream-Hit!",
    "Your last deposit was successful.",
    "Match starts at 8:00 PM.",
    "New rules have been updated.",
    "Withdrawal request processed.",
    "Bonus credited to your account.",
    "Upcoming match reminder.",
  ]);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const navigate = useNavigate();

  // Load user once on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleOpenNotifications = () => {
    setNotifyModalOpen(true);
    setUnreadCount(0);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
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
          <Badge count={unreadCount} size="small" offset={[-2, 6]}>
            <BellOutlined className="icon" onClick={handleOpenNotifications} />
          </Badge>
          <div className="wallet">
            <WalletIcon style={{ marginRight: 6 }} />
            <span className="wallet-amount">₹ {user?.amount || 0}/-</span>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <Drawer
        placement="left"
        width="60%"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        className="custom-drawer"
      >
        <div className="profile-section">
          <Avatar size={50} icon={<UserOutlined />} />
          <span className="profile-name">{user?.name || "Guest"}</span>
        </div>

        <div className="drawer-wallet">
          <WalletIcon style={{ marginRight: 6 }} />
          <span className="wallet-amount">Wallet : ₹ {user?.amount || 0}/-</span>
        </div>

        {user ? (
          <>
            <div className="action-buttons">
              <button className="btn-deposit" onClick={() => navigate("/deposit")}>
                Deposit
              </button>
              <button className="btn-withdraw" onClick={() => navigate("/withdrawal")}>
                Withdraw
              </button>
            </div>

            <Button icon={<BankOutlined />} className="menu-btn" block onClick={() => setTxModalOpen(true)}>
              Transactions
            </Button>

            <Button icon={<LockOutlined />} className="menu-btn" block onClick={() => setCpModalOpen(true)}>
              Change Password
            </Button>

            <Button icon={<BookOutlined />} className="menu-btn" block onClick={() => setRulesModalOpen(true)}>
              Rules
            </Button>

            <Button danger icon={<PoweroffOutlined />} className="menu-btn" block onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <p style={{ marginTop: 20 }}>Please login from home page</p>
        )}
      </Drawer>

      {/* Modals */}
      <TransactionModal open={txModalOpen} onClose={() => setTxModalOpen(false)} />
      <ChangePasswordModal open={cpModalOpen} onClose={() => setCpModalOpen(false)} />
      <RulesModal open={rulesModalOpen} onClose={() => setRulesModalOpen(false)} />
      <NotificationModal open={notifyModalOpen} onClose={() => setNotifyModalOpen(false)} notifications={notifications} />
    </>
  );
}
