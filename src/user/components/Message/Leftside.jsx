import React, { useContext, useEffect, useState } from 'react';
import logo from '../../../assets/logobg.png';
import { IoMdMore } from "react-icons/io";
import { Link } from 'react-router-dom';
import { shareContext } from '../../../context/SearchContextShare';
import {
  accessChatAPI,
  searchUserAPI,
  fetchChatsAPI
} from '../../../services/allAPI';
import ChatLoading from './ChatLoading';
import userImg from '../../../assets/user.webp';
import { useSocket } from '../../../context/SocketContext';

function Leftside({ selectedChat, setSelectedChat }) {
  const [menuDrop, setMenuDrop] = useState(false);
  const { searchKey, setSearchKey, userChat, setUserChat } = useContext(shareContext);
  const [searchResult, setSearchResult] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const socket = useSocket();

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    const userDetails = sessionStorage.getItem("userDetails");

    if (userToken && userDetails) {
      setToken(userToken);
      setUserDetails(JSON.parse(userDetails));
    }
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const reqheaders = { authorization: `Bearer ${token}` };
        const response = await fetchChatsAPI(reqheaders);
        setUserChat(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [token]);

  useEffect(() => {
    const searchUserList = async () => {
      if (!searchKey || !token) {
        setSearchResult([]);
        return;
      }

      try {
        setLoading(true);
        const reqheaders = { authorization: `Bearer ${token}` };
        const response = await searchUserAPI(searchKey, reqheaders);
        setSearchResult(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    searchUserList();
  }, [searchKey, token]);

  const handleAccessChat = async (userId) => {
    try {
      setLoading(true);
      const reqheaders = { authorization: `Bearer ${token}` };
      const response = await accessChatAPI({ senderId: userId }, reqheaders);

      const chat = response.data;

      setUserChat(prev =>
        prev.find(c => c._id === chat._id) ? prev : [chat, ...prev]
      );

      setSelectedChat(chat);
      setSearchKey("");
      setSearchResult([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("message received", (newMessage) => {
      setUserChat(prev => {
        const exists = prev.find(c => c._id === newMessage.chat._id);

        if (exists) {
          const updated = prev.map(c =>
            c._id === newMessage.chat._id
              ? { ...c, latestMessage: newMessage }
              : c
          );

          return [
            updated.find(c => c._id === newMessage.chat._id),
            ...updated.filter(c => c._id !== newMessage.chat._id)
          ];
        }

        return [newMessage.chat, ...prev];
      });
    });

    return () => socket.off("message received");
  }, [socket]);

  return (
    <div className={`bg-[#111928BF] h-full p-5 rounded-lg text-white ${selectedChat ? 'max-md:hidden' : ''}`}>
      <div className="pb-5">
        {/*<div className="flex justify-between items-center">
          <img src={logo} alt="" className='max-w-25' />
          <div className="relative py-2 group">
            <IoMdMore className='text-xl cursor-pointer' onClick={() => setMenuDrop(!menuDrop)} />
            {menuDrop && (
              <div className="absolute right-0 z-10 mt-5 w-56 rounded-md bg-gray-800">
                <Link to='/user/profile' className="block px-4 py-2 text-sm hover:bg-gray-700">
                  Edit Profile
                </Link>
              </div>
            )}
          </div>
        </div>*/}

        <div className={`flex items-center gap-2 mt-5 ${selectedChat ? 'mt-25' : ''}`}>
          <input
            type="search"
            className='bg-gray-800 border px-5 h-10 rounded-full border-gray-700 outline-none text-xs flex-1'
            placeholder='Search User...'
            value={searchKey || ""}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>

        {loading ? <ChatLoading /> : (
          searchResult.map(user => (
            <div
              key={user._id}
              onClick={() => handleAccessChat(user._id)}
              className="flex items-center gap-4 mt-3 p-2 cursor-pointer hover:bg-gray-700 rounded"
            >
              <img src={user.profilePic || userImg} className="w-10 rounded-full" />
              <p>{user.username}</p>
            </div>
          ))
        )}

        <div className='mt-5'>
          {userChat.map(chat => {
            const otherUser = chat.users.find(u => u._id !== userDetails?._id);
            return (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-5 pl-4 rounded cursor-pointer mt-3 ${
                  selectedChat?._id === chat._id ? 'bg-gray-800' : ''
                }`}
              >
                <img src={otherUser?.profilePic || userImg} className="rounded-full w-12" />
                <div>
                  <p>{otherUser?.username}</p>
                  <span className="text-green-400 text-xs">Online</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Leftside;
