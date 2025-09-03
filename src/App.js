import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import HomePage from "./Components/HomePage/HomePage";
import DepositPage from "./Components/DepositPage/DepositPage";
import WithdrawPage from "./Components/Withdrawal/Withdrawal";
import AuctionPage from "./Components/AuctionPage/AuctionPage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
         <Route path="/deposit" element={<DepositPage />} />
          <Route path="/withdrawal" element={<WithdrawPage />} />
          <Route path="/autionpage" element={<AuctionPage />} />
      </Routes>
    </Router>
  );
}
