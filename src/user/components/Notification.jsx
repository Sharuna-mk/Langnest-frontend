import React, { useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";

function Notification() {
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    markAsRead,
  } = useNotification();

  useEffect(() => {
    fetchNotifications();
    markAsRead(); // mark all as read when page opens
  }, []);

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Notifications</h4>
        {unreadCount > 0 && (
          <span className="badge bg-danger">{unreadCount} New</span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="list-group shadow-sm rounded">
          {notifications.map((item) => (
            <div
              key={item._id}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${
                !item.isRead ? "bg-light fw-semibold" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <div>
                <p className="mb-1">{item.message}</p>
                <small className="text-muted">
                  {new Date(item.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
