import { io } from 'socket.io-client';

const SOCKET_URL = `${process.env.REACT_APP_API_URL || "http://localhost:4000"}/chat`;

// Function to create a new socket with current market parameter
export const createSocket = (market = 'IN') => {
    return io(SOCKET_URL, {
        autoConnect: false,
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            market: market
        }
    });
};

// Export a default socket instance for backward compatibility
export const socket = createSocket();