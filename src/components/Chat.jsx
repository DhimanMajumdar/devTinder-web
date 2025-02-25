import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch chat messages (memoized to prevent unnecessary re-renders)
  const fetchChatMessages = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true });
      const chatMessages = response?.data?.messages.map((msg) => ({
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        text: msg.text,
      }));
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [targetUserId]);

  useEffect(() => {
    fetchChatMessages(); // Fetch messages when chat opens

    // Polling: Fetch messages every 30 seconds (Optional)
    const interval = setInterval(() => {
      fetchChatMessages();
    }, 30000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [fetchChatMessages]);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

    // Listen for new messages (real-time updates)
    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Prevent empty messages
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage(""); // Clear input after sending
  };

  return (
    <div className="w-3/4 mx-auto border border-white m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-white text-center font-bold">Chat</h1>

      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((msg, index) => (
          <div key={index} className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}>
            <div className="chat-header">{msg.firstName}</div>
            <div className="chat-bubble bg-blue-500 text-white p-3 rounded-lg">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-white flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-500 p-3 rounded bg-black text-white outline-none"
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
