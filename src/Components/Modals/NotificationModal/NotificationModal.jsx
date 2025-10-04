import React from "react";
import { Modal, List, Tag } from "antd";
import "./NotificationModal.scss";

export default function NotificationModal({ open, onClose, notifications }) {
  return (
    <Modal
      title="Notifications"
      open={open}
      onCancel={onClose}
      footer={null}
      width={350}
      className="notification-modal"
      bodyStyle={{ padding: 10 }}
    >
      <List
        dataSource={notifications}
        renderItem={(item, index) => {
          const status = item.status || "info"; // default
          let color = "blue";
          if (status === "success") color = "green";
          else if (status === "rejected") color = "red";
          else if (status === "pending") color = "orange";

          return (
            <List.Item key={index} className="notification-item">
              <div className="notification-content">
                <span>{item.message}</span>
                {item.status && <Tag color={color}>{item.status.toUpperCase()}</Tag>}
                {item.date && <div className="notification-date">{item.date}</div>}
              </div>
            </List.Item>
          );
        }}
      />
    </Modal>
  );
}
