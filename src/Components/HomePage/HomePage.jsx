import React, { useState, useEffect } from "react";
import SiteHeader from "../SiteHeader/SiteHeader";
import "./HomePage.scss";
import Matches from "../HomeMenuButtons/Matches/Matches";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const navigate = useNavigate();
  const [topStories, setTopStories] = useState([]);

  // Fetch TopStories from backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/topstories");
        setTopStories(res.data);
      } catch (err) {
        console.error("Error fetching top stories:", err);
      }
    };
    fetchStories();
  }, []);

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
          <h3>📢 Top Stories</h3>
          {topStories.length === 0 ? (
            <p>No top stories available.</p>
          ) : (
            topStories.map((story) => (
              <div key={story.id} className="story-item">
                {story.image && (
                  <img src={story.image} alt={story.title} className="updates-image" />
                )}
                <h4>{story.title}</h4>
                <p>{story.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
