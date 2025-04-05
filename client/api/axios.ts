import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 10000, 
});

// // Add interceptors (optional)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add auth token if needed
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     console.error("API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
