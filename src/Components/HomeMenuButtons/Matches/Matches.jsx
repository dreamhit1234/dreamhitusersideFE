import React, { useState, useEffect } from "react";
import "./Matches.scss";
import PlayersModal from "../../Modals/PlayersModal/PlayersModal";
import FinalListModal from "../../Modals/FinalListModal/FinalListModal";
import LeaderBoardModal from "../../Modals/LeaderBoardModal/LeaderBoardModal"; // ✅ import
import { useNavigate } from "react-router-dom";

export default function Matches() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showPlayersModal, setShowPlayersModal] = useState(false);
  const [showFinalListModal, setShowFinalListModal] = useState(false);
  const [showLeaderBoardModal, setShowLeaderBoardModal] = useState(false); // ✅ state
  const [countdowns, setCountdowns] = useState({});

   const navigate = useNavigate();

  const matches = [
    {
      series: "South Africa tour of India 2025",
      name: "IND v AUS",
      time: "2025-08-23T06:30:00",
      format: "T20",
      count: "6",
    },
    {
      series: "South Africa tour of India 2025",
      name: "ENG v SA",
      time: "2025-08-24T09:00:00",
      format: "ODI",
      count: "6+4",
    },
     {
      series: "South Africa tour of India 2025",
      name: "IND v AUS",
      time: "2025-08-23T06:30:00",
      format: "T20",
      count: "6",
    },
    {
      series: "IND Womens tour of PAK Womens 2025",
      name: "INDW v PAKW",
      time: "2025-08-24T09:00:00",
      format: "WT20",
      count: "6+4",
    },
  ];

  const examplePlayers = {
    left: Array.from({ length: 6 }, (_, i) => ({
      name: `Player L${i + 1}`,
      image: "https://via.placeholder.com/40",
    })),
    right: Array.from({ length: 6 }, (_, i) => ({
      name: `Player R${i + 1}`,
      image: "https://via.placeholder.com/40",
    })),
  };

  const totalAmount = () => {
    const leftTotal = examplePlayers.left.reduce((sum, p, i) => sum + (i + 1) * 10, 0);
    const rightTotal = examplePlayers.right.reduce((sum, p, i) => sum + (i + 7) * 10, 0);
    return `₹${leftTotal + rightTotal}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      matches.forEach((match) => {
        const matchTime = new Date(match.time).getTime();
        const now = new Date().getTime();
        const diff = matchTime - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newCountdowns[match.name] = `${hours}h ${minutes}m ${seconds}s`;
        } else if (diff <= 0 && diff > -3600 * 1000) {
          newCountdowns[match.name] = "Processing";
        } else {
          newCountdowns[match.name] = "Over";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [matches]);

  return (
    <div className="matches-list">
      {matches.map((match, index) => (
        <div key={index} className="match-item">
          {/* Row 1: Series Name + Countdown */}
          <div className="match-row series-row">
            <span className="series-name">{match.series}</span>
            <span
              className={`match-countdown ${
                countdowns[match.name] === "Processing"
                  ? "processing"
                  : countdowns[match.name] === "Over"
                  ? "over"
                  : "countdown"
              }`}
            >
              {countdowns[match.name]}
            </span>
          </div>

          {/* Row 2: Match Info */}
          <div className="match-row match-info">
            <span className="match-name">{match.name}</span> |{" "}
            <span className="match-format">{match.format}</span> |{" "}
            <span className="match-count">Count {match.count}</span>
          </div>

          {/* Row 3: Buttons */}
          <div className="match-row match-buttons">
            <button
              onClick={() => {
                setSelectedMatch(match);
                setShowPlayersModal(true);
              }}
            >
              Players List
            </button>

           <button  onClick={() => navigate("/autionpage")}>
            Auction
          </button>
            <button
              onClick={() => {
                setSelectedMatch(match);
                setShowFinalListModal(true);
              }}
            >
              Final List
            </button>

            <button
              onClick={() => {
                setSelectedMatch(match);
                setShowLeaderBoardModal(true); // ✅ open leaderboard
              }}
            >
              Leaderboard
            </button>
          </div>
        </div>
      ))}

      {/* Players Modal */}
      {showPlayersModal && selectedMatch && (
        <PlayersModal
          match={selectedMatch}
          players={examplePlayers}
          onClose={() => setShowPlayersModal(false)}
        />
      )}

      {/* Final List Modal */}
      {showFinalListModal && selectedMatch && (
        <FinalListModal
          match={selectedMatch}
          players={examplePlayers}
          totalAmount={totalAmount()}
          onClose={() => setShowFinalListModal(false)}
        />
      )}

      {/* ✅ Leaderboard Modal */}
      {showLeaderBoardModal && selectedMatch && (
        <LeaderBoardModal
          match={selectedMatch}
          players={[...examplePlayers.left, ...examplePlayers.right]}
          onClose={() => setShowLeaderBoardModal(false)}
        />
      )}
    </div>
  );
}
