import React, { useState } from "react";
import SiteHeader from "../SiteHeader/SiteHeader";
import Tesseract from "tesseract.js";
import "./DepositPage.scss";
import { FaArrowLeft } from "react-icons/fa";

export default function DepositPage({ onBack }) {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");

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
    bank: {
      account: "1234567890",
      bank: "ABC Bank",
      ifsc: "ABCD0123456",
      holder: "RamaRaju",
    },
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setScreenshot(URL.createObjectURL(file));

    // Automatic UTR/Ref/Transaction ID read
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

  return (
    <div className="deposit-page">
      <SiteHeader />

      <div className="deposit-content">
        {/* Back + Page Title */}
        <div className="deposit-header">
          <button
            className="back-btn"
            onClick={() => {
              if (onBack) onBack();
              else window.history.back();
            }}
          >
            <FaArrowLeft /> Back
          </button>

          <h2>Deposit Funds</h2>
        </div>

        {/* Amount Input + Quick Buttons */}
        <div className="amount-section">
          <label>Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter deposit amount"
          />
          <div className="quick-buttons">
            {[100, 500, 1000, 2000, 5000].map((val) => (
              <button key={val} onClick={() => setAmount(val)}>
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`method-btn ${
                selectedMethod === method.id ? "active" : ""
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
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
                  <p>
                    <strong>Holder Name:</strong> {adminDetails.bank.holder}
                  </p>
                  <p>
                    <strong>Bank:</strong> {adminDetails.bank.bank}
                  </p>
                  <p>
                    <strong>Account Number:</strong> {adminDetails.bank.account}
                  </p>
                  <p>
                    <strong>IFSC Code:</strong> {adminDetails.bank.ifsc}
                  </p>
                </>
              ) : (
                <>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0ijC0BqkNvS1WfNm4FDBhNp1pf6WbwnI4Q&s"
                    alt="Scanner"
                    className="qr-img"
                  />
                  <p>
                    <strong>Holder Name:</strong>{" "}
                    {adminDetails[selectedMethod].holder}
                  </p>
                  <p>
                    <strong>UPI ID:</strong> {adminDetails[selectedMethod].upi}
                  </p>
                </>
              )}
            </div>

            {/* Screenshot Upload */}
            <div className="upload-section">
              <label>Upload Screenshot</label>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
              {screenshot && (
                <img src={screenshot} alt="Uploaded" className="preview-img" />
              )}
            </div>

            {/* UTR Input */}
            <div className="utr-section">
              <label>Enter UTR / Ref / Transaction ID</label>
              <input
                type="text"
                value={utrNumber}
                placeholder="Enter UTR / Ref / Transaction ID"
                onChange={(e) => setUtrNumber(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="submit-section">
              <button className="submit-btn">Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
