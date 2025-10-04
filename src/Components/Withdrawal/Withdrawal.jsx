import React, { useState, useEffect } from "react";
import SiteHeader from "../SiteHeader/SiteHeader";
import { FaArrowLeft, FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Withdrawal.scss";

export default function WithdrawPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [bankDetails, setBankDetails] = useState(
    JSON.parse(localStorage.getItem("bankDetails")) || []
  );
  const [selectedBank, setSelectedBank] = useState(
    JSON.parse(localStorage.getItem("selectedBank")) || null
  );
  const [form, setForm] = useState({
    account: "",
    reenterAccount: "",
    bank: "",
    ifsc: "",
    holder: "",
  });
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  // Persist bankDetails & selectedBank in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bankDetails", JSON.stringify(bankDetails));
    localStorage.setItem("selectedBank", JSON.stringify(selectedBank));
  }, [bankDetails, selectedBank]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/withdrawals?userid=user123");
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddBank = async () => {
    if (!form.account || !form.reenterAccount || !form.bank || !form.ifsc || !form.holder) {
      setError("Please fill all fields!");
      return;
    }
    if (form.account !== form.reenterAccount) {
      setError("Account numbers do not match!");
      return;
    }

    const newBank = { ...form };

    // Save bank to backend if needed
    try {
      await axios.post("http://localhost:8080/banks", { userid: "user123", ...newBank });
    } catch (err) {
      console.error("Error saving bank to backend:", err);
    }

    // Update state & localStorage
    const updatedBanks = [...bankDetails, newBank];
    setBankDetails(updatedBanks);
    setSelectedBank(updatedBanks.length - 1);
    setForm({ account: "", reenterAccount: "", bank: "", ifsc: "", holder: "" });
    setShowForm(false);
    setError("");
    setCurrentIndex(updatedBanks.length - 1);
  };

  const handleDeleteBank = (index) => {
    const updated = bankDetails.filter((_, i) => i !== index);
    setBankDetails(updated);
    if (selectedBank === index) setSelectedBank(null);
    if (currentIndex >= updated.length) setCurrentIndex(updated.length - 1);
  };

  const handleSubmitWithdrawal = async () => {
    if (selectedBank === null) {
      setError("Please select your bank");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter valid amount");
      return;
    }
    setError("");

    const bank = bankDetails[selectedBank];
    const withdrawalRequest = {
      userid: "user123",
      amount: parseFloat(amount),
      bank: { account: bank.account, bank: bank.bank, holder: bank.holder, ifsc: bank.ifsc },
      status: "pending",
      date: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:8080/withdrawals", withdrawalRequest);
      // Use response data instead of local object
      setHistory([res.data, ...history]);
      setAmount("");
      setSelectedBank(null);
      alert("Withdrawal request submitted!");
    } catch (err) {
      console.error("Error sending withdrawal request:", err);
      alert("Failed to submit withdrawal request");
    }
  };

  const nextBank = () => {
    if (currentIndex < bankDetails.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const prevBank = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="withdraw-page">
      <SiteHeader />
      <div className="withdraw-content">
        <div className="withdraw-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h2>Withdraw Funds</h2>
        </div>

        <button className="add-bank-btn" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> Add Bank Details
        </button>

        {showForm && (
          <div className="bank-form bordered-box">
            <input type="text" name="holder" value={form.holder} onChange={handleChange} placeholder="Account Holder Name" />
            <input type="text" name="account" value={form.account} onChange={handleChange} placeholder="Account Number" />
            <input type="text" name="reenterAccount" value={form.reenterAccount} onChange={handleChange} placeholder="Re-Enter Account Number" />
            <input type="text" name="bank" value={form.bank} onChange={handleChange} placeholder="Bank Name" />
            <input type="text" name="ifsc" value={form.ifsc} onChange={handleChange} placeholder="IFSC Code" />
            <button className="submit-btn" onClick={handleAddBank}>Save Bank</button>
          </div>
        )}

        {bankDetails.length > 0 && bankDetails[currentIndex] && (
          <div className="carousel-wrapper">
            <button className="nav-btn" onClick={prevBank} disabled={currentIndex === 0}><FaChevronLeft /></button>
            <div className="bank-card-container">
              <div className={`bank-card ${selectedBank === currentIndex ? "selected" : ""}`} onClick={() => setSelectedBank(currentIndex)}>
                <p><strong>Holder:</strong> {bankDetails[currentIndex].holder}</p>
                <p><strong>Account:</strong> {bankDetails[currentIndex].account}</p>
                <p><strong>Bank:</strong> {bankDetails[currentIndex].bank}</p>
                <p><strong>IFSC:</strong> {bankDetails[currentIndex].ifsc}</p>
                <FaTrash className="delete-icon" onClick={e => { e.stopPropagation(); handleDeleteBank(currentIndex); }} />
              </div>
            </div>
            <button className="nav-btn" onClick={nextBank} disabled={currentIndex === bankDetails.length - 1}><FaChevronRight /></button>
          </div>
        )}

        <div className="amount-section">
          <label>Enter Amount</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter withdrawal amount" />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="submit-section">
          <button className="submit-btn" onClick={handleSubmitWithdrawal}>Submit</button>
        </div>

        {history.length > 0 && (
          <div className="withdraw-history">
            <h3>My Withdrawals</h3>
            <table>
              <thead>
                <tr>
                  <th>Bank</th>
                  <th>Account</th>
                  <th>Holder</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, i) => (
                  <tr key={i}>
                    <td>{item.bank?.bank}</td>
                    <td>{item.bank?.account}</td>
                    <td>{item.bank?.holder}</td>
                    <td>₹{item.amount}</td>
                    <td>{item.status}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
