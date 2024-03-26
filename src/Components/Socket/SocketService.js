import socketIOClient from "socket.io-client";
const SERVER_URL = "http://localhost:3001";
const socket = socketIOClient(SERVER_URL);
export default socket;
