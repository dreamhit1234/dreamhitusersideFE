import React from "react";
import { HomeOutlined, TrophyOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import "./SiteFooter.scss";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-btn"><HomeOutlined className="icon" />Home</div>
      <div className="footer-btn"><TrophyOutlined className="icon" />Matches</div>
      <div className="footer-btn"><UserOutlined className="icon" />Profile</div>
      <div className="footer-btn"><SettingOutlined className="icon" />Settings</div>
    </footer>
  );
}
