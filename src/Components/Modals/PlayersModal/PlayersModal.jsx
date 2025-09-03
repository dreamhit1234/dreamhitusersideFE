import React from "react";
import "./PlayersModal.scss";

export default function PlayersModal({ match, players, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="match-title">{match.name} Players</h2>
        <div className="match-info">{match.series} | {match.format}</div>

        <div className="players-columns">
          {/* Team 1 */}
          <div className="team-column team1">
            <div className="team-name">Team 1</div>
            {players.left.map((player, index) => (
              <div key={index} className="player-card team1">
                <img src={"https://www.iplcricketmatch.com/wp-content/uploads/2024/02/Virat-Kohli-IPL-Stats-Salary.jpg"} alt={player.name} />
                <span>{"Virat Kohli"}</span>
              </div>
            ))}
          </div>

          {/* Team 2 */}
          <div className="team-column team2">
            <div className="team-name">Team 2</div>
            {players.right.map((player, index) => (
              <div key={index} className="player-card team2">
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiPyR7wnjDU3QEY_kNbIjXyK2tm_RrD3iDQ&s"} alt={player.name} />
                <span>{"Shivam Dube"}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
