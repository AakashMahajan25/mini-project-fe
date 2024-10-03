import { io } from 'socket.io-client';

const URL = "https://api.frruit.co/chat";

export const socket = io(URL, {
    autoConnect: false,
    auth: {
        token: localStorage.getItem('token')
    }
});