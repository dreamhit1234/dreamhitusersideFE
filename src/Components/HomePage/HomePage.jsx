import React from "react";
import SiteHeader from "../SiteHeader/SiteHeader";
import "./HomePage.scss";
import Matches from "../HomeMenuButtons/Matches/Matches";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <SiteHeader />

      <div className="page-content">
        {/* Top actions */}
        <div className="top-actions">
          <button className="deposit-btn" onClick={() => navigate("/deposit")}>
            Deposit
          </button>
          <button className="withdraw-btn" onClick={() => navigate("/withdrawal")}>
            Withdraw
          </button>
        </div>

        {/* Matches component */}
        <div className="menu-content">
          <Matches />
        </div>

        {/* Updates Section */}
        <div className="updates-section">
          <h3>📢Top Stories </h3>
          <img
            src="https://c.ndtvimg.com/2025-08/a5nhjdgg_cheteshwar-pujara_625x300_24_August_25.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738"
            alt="Match Updates"
            className="updates-image"
          />
          <p>
           In his retirement statement, Pujara expressed immense gratitude for
            his career and thanked the BCCI, Saurashtra Cricket Association, teammates,
             coaches, fans, and his family for their support. He is expected to continue
             his association with the game, including commentary roles.
          </p>
        </div>
      </div>
    </div>
  );
}
