import React, { useState } from "react";
import SiteHeader from "../SiteHeader/SiteHeader";
import {
  FaArrowLeft,
  FaTrash,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Withdrawal.scss";

export default function WithdrawPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [bankDetails, setBankDetails] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
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

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new bank
  const handleAddBank = () => {
    if (
      form.account.trim() &&
      form.reenterAccount.trim() &&
      form.bank.trim() &&
      form.ifsc.trim() &&
      form.holder.trim()
    ) {
      if (form.account !== form.reenterAccount) {
        setError("Account numbers do not match!");
        return;
      }
      setBankDetails([...bankDetails, form]);
      setForm({
        account: "",
        reenterAccount: "",
        bank: "",
        ifsc: "",
        holder: "",
      });
      setShowForm(false);
      setCurrentIndex(bankDetails.length); // show newly added
      setError("");
    } else {
      setError("Please fill all fields!");
    }
  };

  // Delete bank
  const handleDelete = (index) => {
    const updated = bankDetails.filter((_, i) => i !== index);
    setBankDetails(updated);
    if (selectedBank === index) setSelectedBank(null);
    if (currentIndex >= updated.length) setCurrentIndex(updated.length - 1);
  };

  // Submit handler
  const handleSubmit = () => {
    if (selectedBank === null) {
      setError("Please select your bank");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter valid amount");
      return;
    }
    setError("");
    alert(`Submitted ₹${amount} to ${bankDetails[selectedBank].bank}`);
  };

  // Navigate carousel
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
        {/* Header */}
        <div className="withdraw-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h2>Withdraw Funds</h2>
        </div>

        {/* Add Bank Button */}
        <button className="add-bank-btn" onClick={() => setShowForm(!showForm)}>
          <img src="https://illustoon.com/photo/11461.png" alt="bank" />
          <span>Add Bank Details</span>
          <FaPlus className="plus" />
        </button>

        {/* Bank Form */}
        {showForm && (
          <div className="bank-form bordered-box">
            <input
              type="text"
              name="holder"
              value={form.holder}
              onChange={handleChange}
              placeholder="Account Holder Name"
            />
            <input
              type="text"
              name="account"
              value={form.account}
              onChange={handleChange}
              placeholder="Account Number"
            />
            <input
              type="text"
              name="reenterAccount"
              value={form.reenterAccount}
              onChange={handleChange}
              placeholder="Re-Enter Account Number"
            />
            <input
              type="text"
              name="bank"
              value={form.bank}
              onChange={handleChange}
              placeholder="Bank Name"
            />
            <input
              type="text"
              name="ifsc"
              value={form.ifsc}
              onChange={handleChange}
              placeholder="IFSC Code"
            />
            <button className="submit-btn" onClick={handleAddBank}>
              Save Bank
            </button>
          </div>
        )}

        {/* Bank Carousel */}
        {bankDetails.length > 0 && (
          <div className="carousel-wrapper">
            <button
              className="nav-btn"
              onClick={prevBank}
              disabled={currentIndex === 0}
            >
              <FaChevronLeft />
            </button>

            <div className="bank-card-container">
              <div
                className={`bank-card ${
                  selectedBank === currentIndex ? "selected" : ""
                }`}
                onClick={() => setSelectedBank(currentIndex)}
              >
                <p>
                  <strong>Holder:</strong> {bankDetails[currentIndex].holder}
                </p>
                <p>
                  <strong>Account:</strong> {bankDetails[currentIndex].account}
                </p>
                <p>
                  <strong>Bank:</strong> {bankDetails[currentIndex].bank}
                </p>
                <p>
                  <strong>IFSC:</strong> {bankDetails[currentIndex].ifsc}
                </p>
                <FaTrash
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(currentIndex);
                  }}
                />
              </div>
            </div>

            <button
              className="nav-btn"
              onClick={nextBank}
              disabled={currentIndex === bankDetails.length - 1}
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* Amount Input */}
        <div className="amount-section">
          <label>Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter withdrawal amount"
          />
        </div>

        {/* Error Message */}
        {error && <p className="error-msg">{error}</p>}

        {/* Submit Button + Process */}
        <div className="submit-section">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="withdraw-process">
            <p>1. Add your bank account</p>
            <p>2. Select your bank account</p>
            <p>3. Enter the withdrawal amount</p>
            <p>4. Submit request to process funds</p>
          </div>
      </div>
    </div>
  );
}
