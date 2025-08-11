import { io } from "socket.io-client";

const socket = io("https://gigly-backend.onrender.com", {
  //web socket
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
