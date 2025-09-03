import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import "./ChangePassword.scss"



export default function ChangePasswordModal({ open, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // Add your submit logic here
    console.log({ oldPassword, newPassword, confirmPassword });
    onClose();
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
      className="change-password-modal"
    >
      <div className="inputs-container">
        <Input.Password
          placeholder="Enter your old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="line-input"
        />
        <Input.Password
          placeholder="Create your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="line-input"
        />
        <Input.Password
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="line-input"
        />
      </div>

      <div className="submit-btn">
        <Button  block onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
}
