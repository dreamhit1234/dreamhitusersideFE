import React, { useState, useEffect } from "react";
import SiteHeader from "../SiteHeader/SiteHeader";
import Tesseract from "tesseract.js";
import "./DepositPage.scss";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

export default function DepositPage({ onBack }) {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");
  const [deposits, setDeposits] = useState([]);

  // Fetch last 15 deposits on load
  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      const res = await axios.get("http://localhost:8080/deposits");
      const sorted = res.data
        .map((d) => ({
          utrNumber: d.utr || d.utrNumber || "N/A",
          amount: d.amount,
          status: d.status || "Pending",
          date: d.createdAt
            ? new Date(d.createdAt).toLocaleString()
            : new Date().toLocaleString(),
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setDeposits(sorted.slice(0, 15));
    } catch (err) {
      console.error(err);
    }
  };

  const paymentMethods = [
    { id: "phonepe", name: "PhonePe", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4x8kSTmPUq4PFzl4HNT0gObFuEhivHOFYg&s" },
    { id: "gpay", name: "Google Pay", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAFyk2Hu-hbJkgcF7nkVkuxTwwYZztsPc_wQ&s" },
    { id: "paytm", name: "Paytm", img: "https://play-lh.googleusercontent.com/IWU8HM1uQuW8wVrp6XpyOOJXvb_1tDPUDAOfkrl83RZPG9Ww3dCY9X1AV6T1atSvgXc=w240-h480-rw" },
    { id: "bank", name: "Bank", img: "https://illustoon.com/photo/11461.png" },
  ];

  const adminDetails = {
    phonepe: { holder: "RamaRaju", upi: "8974378393@ybl" },
    gpay: { holder: "RamaRaju", upi: "8974378393@okgpay" },
    paytm: { holder: "RamaRaju", upi: "8974378393@paytm" },
    bank: { account: "1234567890", bank: "ABC Bank", ifsc: "ABCD0123456", holder: "RamaRaju" },
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setScreenshot(URL.createObjectURL(file));

    // OCR to extract UTR/Ref/Transaction ID
    Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        const utr = text.match(/UTR\s*[:\-]?\s*(\d{8,})/i);
        const upiRef = text.match(/UPI Ref\s*[:\-]?\s*(\w+)/i);
        const transId = text.match(/Transaction\s*ID\s*[:\-]?\s*(\w+)/i);

        if (utr) setUtrNumber(utr[1]);
        else if (upiRef) setUtrNumber(upiRef[1]);
        else if (transId) setUtrNumber(transId[1]);
        else setUtrNumber("");
      })
      .catch((err) => console.error(err));
  };

  const handleSubmitDeposit = async () => {
    if (!amount || !selectedMethod) return alert("Enter amount and select method");

    const utrValue = utrNumber || `UTR${Math.floor(100000 + Math.random() * 900000)}`;

    const formData = new FormData();
    formData.append("userid", "user123");
    formData.append("amount", parseFloat(amount));
    formData.append("utr", utrValue);

    if (screenshot) {
      // Convert blob URL to file
      const file = await fetch(screenshot)
        .then((r) => r.blob())
        .then((blob) => new File([blob], "screenshot.png", { type: blob.type }));
      formData.append("image", file);
    }

    try {
      const res = await axios.post("http://localhost:8080/deposits", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update local deposits table
      setDeposits((prev) => [
        { utrNumber: utrValue, amount: parseFloat(amount), status: "Pending", date: new Date().toLocaleString() },
        ...prev,
      ].slice(0, 15));

      setAmount("");
      setSelectedMethod(null);
      setScreenshot(null);
      setUtrNumber("");

      alert("Deposit submitted successfully");
    } catch (err) {
      console.error("Deposit submission failed:", err.response ? err.response.data : err);
      alert("Failed to submit deposit. Check console.");
    }
  };

  return (
    <div className="deposit-page">
      <SiteHeader />

      <div className="deposit-content">
        <div className="deposit-header">
          <button className="back-btn" onClick={() => (onBack ? onBack() : window.history.back())}>
            <FaArrowLeft /> Back
          </button>
          <h2>Deposit Funds</h2>
        </div>

        {/* Amount Input */}
        <div className="amount-section">
          <label>Enter Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter deposit amount" />
          <div className="quick-buttons">
            {[100, 500, 1000, 2000, 5000].map((val) => (
              <button key={val} onClick={() => setAmount(val)}>{val}</button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <button key={method.id} className={`method-btn ${selectedMethod === method.id ? "active" : ""}`} onClick={() => setSelectedMethod(method.id)}>
              <img src={method.img} alt={method.name} />
              <span>{method.name}</span>
            </button>
          ))}
        </div>

        {/* Admin Details */}
        {selectedMethod && (
          <div className="admin-section">
            <div className="admin-details bordered-box">
              {selectedMethod === "bank" ? (
                <>
                  <p><strong>Holder Name:</strong> {adminDetails.bank.holder}</p>
                  <p><strong>Bank:</strong> {adminDetails.bank.bank}</p>
                  <p><strong>Account Number:</strong> {adminDetails.bank.account}</p>
                  <p><strong>IFSC Code:</strong> {adminDetails.bank.ifsc}</p>
                </>
              ) : (
                <>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0ijC0BqkNvS1WfNm4FDBhNp1pf6WbwnI4Q&s" alt="Scanner" className="qr-img" />
                  <p><strong>Holder Name:</strong> {adminDetails[selectedMethod].holder}</p>
                  <p><strong>UPI ID:</strong> {adminDetails[selectedMethod].upi}</p>
                </>
              )}
            </div>

            {/* Screenshot Upload */}
            <div className="upload-section">
              <label>Upload Screenshot</label>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
              {screenshot && <img src={screenshot} alt="Uploaded" className="preview-img" />}
            </div>

            {/* UTR Input */}
            <div className="utr-section">
              <label>Enter UTR / Ref / Transaction ID</label>
              <input type="text" value={utrNumber} placeholder="Enter UTR / Ref / Transaction ID" onChange={(e) => setUtrNumber(e.target.value)} />
            </div>

            {/* Submit */}
            <div className="submit-section">
              <button className="submit-btn" onClick={handleSubmitDeposit}>Submit</button>
            </div>
          </div>
        )}

        {/* Deposits History Table */}
        {deposits.length > 0 && (
          <div className="deposits-history">
            <h4>Last 15 Deposits</h4>
            <table>
              <thead>
                <tr>
                  <th>UTR Number</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d, i) => (
                  <tr key={i}>
                    <td>{d.utrNumber}</td>
                    <td>₹{d.amount}</td>
                    <td className={d.status}>{d.status}</td>
                    <td>{d.date}</td>
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
