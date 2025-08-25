import { io } from 'socket.io-client';

// Use the same base URL as the API but for socket connection
const SOCKET_URL = "https://frruitapi.airrchip.com/chat";

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    auth: {
        token: localStorage.getItem('token')
    }
});