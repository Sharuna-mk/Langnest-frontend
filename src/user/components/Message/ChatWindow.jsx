import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../context/SocketContext";
import MessageInput from "./MessageInput";
import { fetchMessagesAPI, sendMessageAPI } from "../../../services/allAPI";

export default function ChatWindow({ selectedChat, userDetails }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);

  const token = sessionStorage.getItem("token");

  /* SETUP USER */
  useEffect(() => {
    if (socket && userDetails?._id) {
      socket.emit("setup", userDetails._id);
    }
  }, [socket, userDetails?._id]);

  /* FETCH + JOIN CHAT */
  useEffect(() => {
    if (!socket || !selectedChat?._id) return;

    fetchMessagesAPI(
      selectedChat._id,
      { authorization: `Bearer ${token}` }
    ).then(res => setMessages(res.data));

    socket.emit("join-chat", selectedChat._id);
  }, [socket, selectedChat?._id]);

  /* SOCKET LISTENERS */
  useEffect(() => {
    if (!socket) return;

    const onMessage = (msg) => {
      if (msg.chat._id === selectedChat._id) {
        setMessages(prev => [...prev, msg]);
      }
    };

    socket.on("receive-message", onMessage);
    socket.on("typing", () => setTyping(true));
    socket.on("stop-typing", () => setTyping(false));

    return () => {
      socket.off("receive-message", onMessage);
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [socket, selectedChat?._id]);

  /* SEND MESSAGE */
  const handleSend = async (content) => {
    if (!content.trim()) return;

    const res = await sendMessageAPI(
      { chatId: selectedChat._id, content },
      { authorization: `Bearer ${token}` }
    );

    const message = res.data.message ?? res.data;

    setMessages(prev => [...prev, message]);
    socket.emit("send-message", message);
    socket.emit("stop-typing", selectedChat._id);
  };

  /* TYPING */
  const handleTyping = () => {
    socket.emit("typing", selectedChat._id);

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stop-typing", selectedChat._id);
    }, 1000);
  };

  /* AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(msg => (
          <div
            key={msg._id}
            className={`my-1 ${
              msg.senderId._id === userDetails._id
                ? "text-end"
                : "text-start"
            }`}
          >
            <span className="bg-gray-200 p-2 rounded">
              {msg.content}
            </span>
          </div>
        ))}
        {typing && <p className="text-sm text-gray-400">Typing...</p>}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={handleSend} onTyping={handleTyping} />
    </div>
  );
}
