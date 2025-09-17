import { io } from 'socket.io-client';

// Use the same base URL as the API but for socket connection
const SOCKET_URL = "https://frruitapi.airrchip.com/chat";

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