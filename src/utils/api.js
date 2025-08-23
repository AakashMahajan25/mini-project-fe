import axios from "axios";

const api = axios.create({
      baseURL: 'https://frruitapi.airrchip.com/',
   //    baseURL: 'http://18.233.54.54/api/', // Your API base URL
  // baseURL: "http://localhost:4000/api/", // Your Local API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any common headers here
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  token && (config.headers.Authorization = "Bearer " + token);
  config.headers.platform = 'web';
  return config;
});

export const responseInterceptor = (navigate) => {
  return api.interceptors.response.use(
      (response) => {
          return response;
      },
      (error) => {
          if (error.response && error.response.status && error.response.status === 401) {
                  delete error.config.headers.Authorization;
                  localStorage.removeItem('token')
                  navigate('/')
          }
          return Promise.reject(error);
      }
  );
}


// Optional: Add interceptors for authentication, error handling, etc.

export default api;
