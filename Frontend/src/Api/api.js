import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors
// api.interceptors.request.use(config => {
//   // Add auth token if present
//   return config;
// });

export default api;
