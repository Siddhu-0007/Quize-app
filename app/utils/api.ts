// utils/api.ts
import axios from "axios";

// ⚡ Update this IP only once here
export const BASE_URL = "http://10.59.238.62:5000/api/quiz";

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // optional
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
