import { io } from 'socket.io-client';

const URL = "http://18.233.54.54:3000/chat";

export const socket = io(URL, {
    autoConnect: false,
    auth: {
        token: localStorage.getItem('token')
    }
});