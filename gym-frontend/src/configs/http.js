import axios from "axios";

// ✅ Backend Render URL
export const baseURL = "https://gym-project-qegl.onrender.com";

const http = axios.create({
  baseURL,
});

// ✅ Request interceptor (token fix)
http.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token"); // 🔥 moved inside

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default http;