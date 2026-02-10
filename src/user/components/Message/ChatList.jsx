// src/components/ChatList.jsx
import { useEffect, useState } from "react";
import { fetchChatsAPI } from "../../../services/allAPI";


export default function ChatList({ selectedChat, setSelectedChat }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChatsAPI().then(res => setChats(res.data));
  }, []);

  return (
    <div>
      {chats?.map(chat => (
        <div
          key={chat._id}
          onClick={() => setSelectedChat(chat)}
          className={`p-4 cursor-pointer hover:bg-gray-100 ${
            selectedChat?._id === chat._id ? "bg-gray-200" : ""
          }`}
        >
          <div className="flex justify-between">
            <span>{chat.isGroupChat ? chat.chatName : chat.users.find(u => u._id !== localStorage.getItem("userId")).username}</span>
            {chat.latestMessage && !chat.latestMessage.seen && <span className="text-red-500 font-bold">●</span>}
          </div>
          <div className="text-sm text-gray-500 truncate">
            {chat.latestMessage?.content || "No messages yet"}
          </div>
        </div>
      ))}
    </div>
  );
}
