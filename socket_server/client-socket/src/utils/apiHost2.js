// apiHost2.js

import axios from "axios";

// Create an Axios instance with default configuration
const apiHost2 = axios.create({
  baseURL: "http://localhost:8085/api", // Base URL for all requests
  headers: {
    "Content-Type": "application/json", // Default Content-Type header
    // Add other default headers here
  },
  // You can add other default settings here (e.g., timeout)
});

// Request interceptor for adding authorization token to every request if available
apiHost2.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor for handling global response errors
apiHost2.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // You can handle global errors here (e.g., 401 Unauthorized, 500 Server Error)
    return Promise.reject(error);
  }
);

export default apiHost2;
