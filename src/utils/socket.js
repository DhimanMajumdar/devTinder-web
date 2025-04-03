import { io } from "socket.io-client";
import { BASE_URL } from "./constants"; // ✅ Ensure BASE_URL is correct

export const createSocketConnection = () => {
  console.log("🔄 Connecting to WebSocket:", BASE_URL);

  const socket = io(BASE_URL, {
    path: "/socket.io/",
    transports: ["websocket", "polling"], // ✅ Ensure polling fallback
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
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
