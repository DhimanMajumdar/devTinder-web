import { io } from "socket.io-client";
import { BASE_URL } from "./constants"; // This should be your backend URL

export const createSocketConnection = () => {
  console.log("Initializing WebSocket...");

  const socket = io(BASE_URL, {
    path: "/socket.io/", // ✅ Ensure correct path (remove `/api/socket.io/`)
    transports: ["websocket", "polling"], // ✅ Ensure polling fallback
    withCredentials: true, // ✅ Allow auth-based WebSocket connections
  });

  socket.on("connect", () => {
    console.log("✅ WebSocket Connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ WebSocket Disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("⚠️ WebSocket Connection Error:", err);
  });

  return socket;
};
