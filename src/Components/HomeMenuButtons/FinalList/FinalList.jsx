import React, { useState } from "react";
import "./FinalList.scss";
import FinalListModal from "../../Modals/FinalListModal/FinalListModal";

export default function FinalList() {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const matches = [
    { name: "IND v AUS", time: "2025-08-20T06:30:00", format: "T20", count: "6" },
    { name: "ENG v SA", time: "2025-08-21T09:00:00", format: "ODI", count: "6+4" },
    { name: "PAK v NZ", time: "2025-08-20T10:00:00", format: "T20", count: "6" },
    { name: "WI v SL", time: "2025-08-20T12:00:00", format: "ODI", count: "6+4" },
    { name: "BAN v ZIM", time: "2025-08-21T15:00:00", format: "T20", count: "6" },
    { name: "AFG v IRE", time: "2025-08-21T17:00:00", format: "ODI", count: "6+4" },
  ];

  const examplePlayers = {
    left: Array.from({ length: 6 }, (_, i) => ({
      name: `Player L${i + 1}`,
      image: "https://via.placeholder.com/40",
      price: `${(i + 1) * 10}`,
    })),
    right: Array.from({ length: 6 }, (_, i) => ({
      name: `Player R${i + 1}`,
      image: "https://via.placeholder.com/40",
      price: `${(i + 7) * 10}`,
    })),
  };

  const totalAmount = () => {
    const leftTotal = examplePlayers.left.reduce((sum, p) => sum + parseInt(p.price), 0);
    const rightTotal = examplePlayers.right.reduce((sum, p) => sum + parseInt(p.price), 0);
    return leftTotal + rightTotal;
  };

  return (
    <div className="final-list">
      {matches.map((match, index) => (
        <button
          key={index}
          className="match-item"
          onClick={() => setSelectedMatch(match)}
        >
          <div className="match-info">
            <span className="match-name">{match.name}</span> |{" "}
            <span className="match-time">{match.time}</span> |{" "}
            <span className="match-format">{match.format}</span> |{" "}
            <span className="match-count">Count {match.count}</span>
          </div>
        </button>
      ))}

      {selectedMatch && (
        <FinalListModal
          match={selectedMatch}
          players={examplePlayers}
          totalAmount={totalAmount()}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
}
