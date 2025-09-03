import React, { useState, useEffect, useRef } from "react";
import "./AuctionPage.scss";

export default function AuctionUserView() {
  const matchInfo = { name: "ENG vs BAN", type: "T20", count: "6's only" };
  const walletAmount = 5000;

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [nextPlayers] = useState([
    {
      id: 1,
      name: "Shivam Dube",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyhCJ9W8RhhXuyFKAmpu4kKRmobPRQc2o1_JfMZkqPARMmvLqtPaWApeLSs-Fuvy5sPs0&usqp=CAU",
    },
    {
      id: 2,
      name: "Player B",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiPyR7wnjDU3QEY_kNbIjXyK2tm_RrD3iDQ&s",
    },
    { id: 3, name: "Player C", img: "https://via.placeholder.com/50" },
    { id: 4, name: "Player D", img: "https://via.placeholder.com/50" },
    { id: 5, name: "Player E", img: "https://via.placeholder.com/50" },
    { id: 6, name: "Player F", img: "https://via.placeholder.com/50" },
    { id: 7, name: "Player G", img: "https://via.placeholder.com/50" },
  ]);
  const [soldPlayers] = useState([
    {
      id: 8,
      name: "Player X",
      buyer: "User1",
      price: 700,
      img: "https://via.placeholder.com/50",
    },
    {
      id: 9,
      name: "Player Y",
      buyer: "User2",
      price: 1100,
      img: "https://via.placeholder.com/50",
    },
  ]);

  const [currentPlayer] = useState(nextPlayers[0]);
  const [currentPrice, setCurrentPrice] = useState(500);
  const [chat, setChat] = useState([]);
  const bidOptions = [50, 100, 200, 500, 1000];
  const chatEndRef = useRef(null);

  const handleBid = (amount) => {
    const newPrice = currentPrice + amount;
    setCurrentPrice(newPrice);

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const timeStr = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;

    setChat([...chat, { user: "You", price: newPrice, time: timeStr }]);
  };

//   const handleBid = (amount) => {
//     const newPrice = currentPrice + amount;
//     setCurrentPrice(newPrice);
//     setChat([...chat, { user: "You", price: newPrice }]);
//   };

  const toggleDropdown = (type) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  const handleBack = () => {
    window.history.back(); // Browser back
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div className="auction-user-view">
      {/* Header */}
      <div className="auction-header">
        <div className="match-info">
          <span className="match-name">{matchInfo.name}</span>
          <span className="match-type">
            {matchInfo.type}, {matchInfo.count}
          </span>
        </div>
        <div className="wallet">Wallet: ₹ {walletAmount}</div>
      </div>

      <div className="back-button-top" onClick={handleBack}>
        ← Back
      </div>

      {/* Tabs */}
      <div className="auction-buttons">
        <button
          className={activeDropdown === "next" ? "active" : ""}
          onClick={() => toggleDropdown("next")}
        >
          Next Players
        </button>
        <button
          className={activeDropdown === "sold" ? "active" : ""}
          onClick={() => toggleDropdown("sold")}
        >
          Sold Players
        </button>
      </div>

      {/* Next Players */}
      {activeDropdown === "next" && (
        <div className="dropdown-container">
          <div className="player-scroll">
            {nextPlayers.map((p) => (
              <div className="player-card" key={p.id}>
                <img src={p.img} alt={p.name} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sold Players */}
      {activeDropdown === "sold" && (
        <div className="dropdown-container">
          <div className="player-scroll">
            {soldPlayers.map((p) => (
              <div className="player-card" key={p.id}>
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiPyR7wnjDU3QEY_kNbIjXyK2tm_RrD3iDQ&s"
                  }
                  alt={p.name}
                />
                <span>{p.name}</span>
                <span>Buyer: {p.buyer}</span>
                <span>₹ {p.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Player */}
      <div className="current-player">
        <div className="player-card">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiPyR7wnjDU3QEY_kNbIjXyK2tm_RrD3iDQ&s"
            }
            alt={currentPlayer.name}
          />
          <span>{currentPlayer.name}</span>
          <span>₹ {currentPrice}</span>
        </div>
      </div>

      {/* Chatbox */}
      <div className="chatbox">
        {chat.length === 0 && <div className="empty-chat">No bids yet</div>}
        {chat.map((c, i) => (
          <div
            key={i}
            className={`chat-message ${c.user === "You" ? "left" : "right"}`}
          >
            <div className="user-icon">{c.user[0]}</div>
            <div className="chat-content">
              <div className="chat-amount">{c.price}</div>
              <div className="chat-time">{c.time}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Footer Bid Buttons */}
      <div className="footer-bid-buttons">
        {bidOptions.map((b) => (
          <button key={b} onClick={() => handleBid(b)}>
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}
