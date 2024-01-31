import axios from "axios";

const api = axios.create({
  baseURL: 'http://13.126.207.249:3000/api/', // Your API base URL
  // baseURL: "http://localhost:4000/api/", // Your Local API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any common headers here
  },
});

api.interceptors.request.use(function (config) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzMiLCJ1c2VyX2RldGFpbF9pZCI6IjI3IiwiY29nbml0b0lkIjoiYjE5MmQ1MzYtMDMyNC00NjJmLWFlMmItNzA2YjcyMmE4NzMyIiwiZXhwaXJlc0luIjoiMTgwMHMiLCJpYXQiOjE3MDY2OTkzODN9.fbuu3LKc8f4C5CKDmBQwVDX9rGo5azxILieu0QDohEs';
  token && (config.headers.Authorization = "Bearer " + token);
  config.headers.platform = 'web';
  return config;
});

// export const responseInterceptor = (navigate) => {
//   return api.interceptors.response.use(
//       (response) => {
//           return response;
//       },
//       (error) => {
//           if (error.response && error.response.status && error.response.status === 401) {
//                   delete error.config.headers.Authorization;
//                   localStorage.removeItem('token')
//                   navigate('/')
//           }
//           return Promise.reject(error);
//       }
//   );
// }


// Optional: Add interceptors for authentication, error handling, etc.

export default api;