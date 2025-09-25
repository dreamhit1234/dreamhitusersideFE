import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Matches.scss";
import PlayersModal from "../../Modals/PlayersModal/PlayersModal";
import FinalListModal from "../../Modals/FinalListModal/FinalListModal";
import LeaderBoardModal from "../../Modals/LeaderBoardModal/LeaderBoardModal";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showPlayersModal, setShowPlayersModal] = useState(false);
  const [showFinalListModal, setShowFinalListModal] = useState(false);
  const [showLeaderBoardModal, setShowLeaderBoardModal] = useState(false);
  const [countdowns, setCountdowns] = useState({});
  const navigate = useNavigate();

  // Dummy example players
  const examplePlayers = {
    left: Array.from({ length: 6 }, (_, i) => ({ name: `Player L${i + 1}`, image: "https://via.placeholder.com/40" })),
    right: Array.from({ length: 6 }, (_, i) => ({ name: `Player R${i + 1}`, image: "https://via.placeholder.com/40" })),
  };

  const totalAmount = () => {
    const leftTotal = examplePlayers.left.reduce((sum, p, i) => sum + (i + 1) * 10, 0);
    const rightTotal = examplePlayers.right.reduce((sum, p, i) => sum + (i + 7) * 10, 0);
    return `₹${leftTotal + rightTotal}`;
  };

  // Fetch matches from backend
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("http://localhost:8080/matches");
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };
    fetchMatches();
  }, []);

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      matches.forEach((match) => {
        let matchTime = new Date(match.time); // match.time should be ISO string from backend
        const now = new Date().getTime();
        const diff = matchTime.getTime() - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newCountdowns[match.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else if (diff <= 0 && diff > -3600 * 1000) {
          newCountdowns[match.id] = "Processing";
        } else {
          newCountdowns[match.id] = "Over";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [matches]);

  return (
    <div className="matches-list">
      <Swiper spaceBetween={15} slidesPerView={1} pagination={{ clickable: true }} modules={[Pagination]}>
        {matches.map((match) => (
          <SwiperSlide key={match.id}>
            <div className="match-item">
              <div className="match-row series-row">
                <span className="series-name">{match.series}</span>
                <span
                  className={`match-countdown ${
                    countdowns[match.id] === "Processing"
                      ? "processing"
                      : countdowns[match.id] === "Over"
                      ? "over"
                      : "countdown"
                  }`}
                >
                  {countdowns[match.id]}
                </span>
              </div>

              <div className="match-row match-info">
                <span className="match-name">{match.team1} vs {match.team2}</span> |{" "}
                <span className="match-format">{match.format}</span> |{" "}
                <span className="match-count">Count {match.count}</span>
              </div>

              <div className="match-row match-buttons">
                <button onClick={() => { setSelectedMatch(match); setShowPlayersModal(true); }}>
                  Players List
                </button>
                <button onClick={() => navigate("/auctionpage")}>Auction</button>
                <button onClick={() => { setSelectedMatch(match); setShowFinalListModal(true); }}>
                  Final List
                </button>
                <button onClick={() => { setSelectedMatch(match); setShowLeaderBoardModal(true); }}>
                  Leaderboard
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showPlayersModal && selectedMatch && (
        <PlayersModal match={selectedMatch} players={examplePlayers} onClose={() => setShowPlayersModal(false)} />
      )}

      {showFinalListModal && selectedMatch && (
        <FinalListModal match={selectedMatch} players={examplePlayers} totalAmount={totalAmount()} onClose={() => setShowFinalListModal(false)} />
      )}

      {showLeaderBoardModal && selectedMatch && (
        <LeaderBoardModal match={selectedMatch} players={[...examplePlayers.left, ...examplePlayers.right]} onClose={() => setShowLeaderBoardModal(false)} />
      )}
    </div>
  );
}
