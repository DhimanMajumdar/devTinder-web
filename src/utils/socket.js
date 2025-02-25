import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", {
      path: "/api/socket.io",
      transports: ["websocket", "polling"], // Ensure fallback to polling
      withCredentials: true, // Allow cookies for authentication
    });
  }
};
