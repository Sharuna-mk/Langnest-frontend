import React, { useEffect, useRef, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { fetchMessagesAPI, sendMessageAPI } from "../../../services/allAPI";
import { useSocket } from "../../../context/SocketContext";
import userImg from '../../../assets/user.webp';

function Rightside({ selectedChat }) {
  const socket = useSocket();

  const [userinfo, setUserInfo] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef(null);
  const typingTimeoutRef = useRef(null);

 selectedChat? console.log(selectedChat.users[1]): ''
 
  // Load user + token
  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("userDetails");

    if (userToken && user) {
      setToken(userToken);
      setUserDetails(JSON.parse(user));
    }
  }, []);

  // Fetch messages when chat changes
  useEffect(() => {
    if (!token || !selectedChat?._id) return;

    const fetchMessages = async () => {
      try {
        const reqHeader = { authorization: `Bearer ${token}` };
        const res = await fetchMessagesAPI(selectedChat._id, reqHeader);
        console.log(res);
        
        setMessages(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [token, selectedChat?._id]);

  // Join chat room
  useEffect(() => {
    if (!socket || !selectedChat?._id) return;
    socket.emit("join-chat", selectedChat._id); 
  }, [socket, selectedChat?._id]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const handleMessageReceived = (newMessage) => {
      if (newMessage.chat._id !== selectedChat?._id) return;
      setMessages((prev) => {
        const exists = prev.find((m) => m._id === newMessage._id);
        return exists ? prev : [...prev, newMessage];
      });
    };

    socket.on("receive-message", handleMessageReceived); 
    socket.on("typing", () => setTyping(true));
    socket.on("stop-typing", () => setTyping(false));

    return () => {
      socket.off("receive-message", handleMessageReceived);
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [socket, selectedChat?._id]);

  // Send message
  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat?._id) return;

    const content = message;
    setMessage("");

    try {
      const reqHeader = { authorization: `Bearer ${token}` };
      const reqBody = { chatId: selectedChat._id, content };

      const res = await sendMessageAPI(reqBody, reqHeader);
      const newMessage = res.data;

      // Show immediately for sender
      setMessages((prev) => [...prev, newMessage]);

      // Emit to room
      socket.emit("send-message", newMessage); // ✅ match backend
      socket.emit("stop-typing", selectedChat._id);
    } catch (err) {
      console.log(err);
    }
  };

  // Typing indicator
  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!socket || !selectedChat?._id) return;

    socket.emit("typing", selectedChat._id);

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", selectedChat._id);
    }, 1000);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  if (!selectedChat) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-xl font-semibold">No messages yet</h3>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col backdrop-blur-lg">
      {/* HEADER */}
      <div className="sticky top-0 z-10 flex items-center gap-3 py-3 px-4 border-b border-gray-500 bg-gray-900 flex justify-between">
        <div className="flex items-center gap-2">
          <img src={selectedChat? selectedChat.users[1].profile: userImg} className="rounded-full w-10 h-10" />
        <p className="flex-1 text-xl text-white fw-bold">{selectedChat? selectedChat.users[1].username:''}</p>
        </div>
        <IoIosInformationCircleOutline
          className="text-3xl cursor-pointer"
          onClick={() => setUserInfo(true)}
        />
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 mt-10">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex mb-2 ${
              msg.senderId?._id === userDetails?._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <p
              className={`p-2 max-w-[220px] rounded-lg text-sm ${
                msg.senderId?._id === userDetails?._id
                  ? "bg-violet-500/30 text-white"
                  : "bg-gray-600 text-white"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}

        {typing && <p className="text-xs text-gray-400">Typing...</p>}
        <div ref={scrollRef} />
      </div>

      {/* INPUT */}
      <div className="sticky bottom-0 bg-gray-900 flex items-center gap-3 p-3">
        <input
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 text-sm p-3 bg-gray-700 rounded-full outline-none text-white"
        />
        <IoSend className="text-2xl cursor-pointer" onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default Rightside;
