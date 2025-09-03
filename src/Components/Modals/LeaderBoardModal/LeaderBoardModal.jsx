import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./LeaderBoardModal.scss";

export default function LeaderBoardModal({ match, players, onClose }) {
  const [leaderboard, setLeaderboard] = useState([]);

  // Dummy scores
  const [scores, setScores] = useState(
    players.map((p) => ({
      ...p,
      fours: 0,
      sixes: 0,
    }))
  );

  // Simulate admin updates (demo purpose)
  useEffect(() => {
    const interval = setInterval(() => {
      setScores((prev) =>
        prev.map((p) => ({
          ...p,
          fours:
            p.fours +
            ((match.format === "ODI" || match.format === "WODI" || match.format === "WT20")
              ? Math.floor(Math.random() * 2)
              : 0),
          sixes: p.sixes + Math.floor(Math.random() * 2),
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [match.format]);

  // Sort leaderboard
  useEffect(() => {
    let sortedPlayers = [];
    if (match.format === "ODI" || match.format === "WODI" || match.format === "WT20") {
      // Women + ODI → use runs calculation
      sortedPlayers = [...scores].sort(
        (a, b) =>
          b.fours * 4 + b.sixes * 6 - (a.fours * 4 + a.sixes * 6)
      );
    } else {
      // Men’s T20 → only sixes
      sortedPlayers = [...scores].sort((a, b) => b.sixes - a.sixes);
    }
    setLeaderboard(sortedPlayers);
  }, [scores, match.format]);

  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={null}
      className="leaderboard-modal"
      title={`${match.name} - Leaderboard (${match.format})`}
    >
      <div className="leaderboard-table-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Player</th>
              {(match.format === "ODI" || match.format === "WODI" || match.format === "WT20") && (
                <th>4s</th>
              )}
              <th>6s</th>
              {(match.format === "ODI" || match.format === "WODI" || match.format === "WT20") && (
                <th>Total Runs</th>
              )}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={index} className={index === 0 ? "top-player" : ""}>
                <td className="player-cell">
                  <img src={"https://www.iplcricketmatch.com/wp-content/uploads/2024/02/Virat-Kohli-IPL-Stats-Salary.jpg"} alt={player.name} />
                  <span>{"Virat Kohli"}</span>
                </td>

                {(match.format === "ODI" || match.format === "WODI" || match.format === "WT20") && (
                  <td>{player.fours}</td>
                )}

                <td>{player.sixes}</td>

                {(match.format === "ODI" || match.format === "WODI" || match.format === "WT20") && (
                  <td>{player.fours * 4 + player.sixes * 6}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
