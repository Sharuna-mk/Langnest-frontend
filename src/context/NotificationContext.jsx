import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import {
  getNotificationsAPI,
  markNotificationsReadAPI,
} from "../services/allAPI";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const socket = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  // 🔥 Join socket room
  useEffect(() => {
    if (!socket || !user?._id) return;

    socket.emit("join", user._id);

    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("newNotification");
    };
  }, [socket, user]);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const result = await getNotificationsAPI(reqHeader);

      if (result.status === 200) {
        setNotifications(result.data.notifications || []);
        setUnreadCount(result.data.unreadCount || 0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Mark as read
  const markAsRead = async () => {
    try {
      const result = await markNotificationsReadAPI(reqHeader);

      if (result.status === 200) {
        setUnreadCount(0);
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, isRead: true }))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        fetchNotifications,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
