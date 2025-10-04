import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.scss";

export default function ChangePasswordModal({ open, onClose, username }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    // Check all fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      message.error("Please fill all fields");
      return;
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      message.error("New password and Confirm password do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/users/change-password", {
        username,
        oldPassword,
        newPassword,
      });

      // Success message from backend
      message.success(res.data.message || "Password changed successfully");

      // Clear local storage and force re-login
      localStorage.removeItem("user");
      onClose();
      navigate("/"); // back to landing page
    } catch (err) {
      console.error(err);

      // Get backend error message
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to change password";

      message.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="change-password-modal"
      title="Change Password"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form layout="vertical" className="inputs-container">
        <Form.Item>
          <Input.Password
            className="line-input"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Input.Password
            className="line-input"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Input.Password
            className="line-input"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>

        <div className="submit-btn">
          <Button
            type="primary"
            block
            loading={loading}
            onClick={handleChangePassword}
          >
            Update Password
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
