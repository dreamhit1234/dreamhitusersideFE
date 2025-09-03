import React from "react";
import { Modal, List } from "antd";
import "./NotificationModal.scss"

export default function NotificationModal({ open, onClose, notifications }) {
  return (
    <Modal
      title="Notifications"
      open={open}
      onCancel={onClose}
      footer={null}
      width={350}
      className="notification-modal"
    >
      <List
        dataSource={notifications}
        renderItem={(item, index) => (
          <List.Item key={index}>{item}</List.Item>
        )}
      />
    </Modal>
  );
}
