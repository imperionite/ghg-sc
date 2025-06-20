import axios from "axios";
import qs from "qs";

const baseURL = import.meta.env.VITE_BASE_URL;
export const http = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 100000,
});

// Function to get access token
const getAccessToken = () => {
  const authAtom = localStorage.getItem("authAtom");
  let auth = authAtom ? JSON.parse(authAtom) : null;
  return auth ? auth.token : null;
};

// Interceptor to add the Authorization header with the access token
http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data) {
      if (
        typeof config.data === "object" &&
        !(config.data instanceof FormData)
      ) {
        config.headers["Content-Type"] = "application/json";
      } else if (typeof config.data === "string") {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      } else if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }
    }

    if (
      config.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(config.data);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401 errors (no refresh endpoint available)
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/login")
    ) {
      localStorage.removeItem("authAtom");
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

// API functions
const login = async (data) => {
  try {
    const response = await http.post("/api/login", data);
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

const register = async (data) => {
  try {
    const response = await http.post("/api/register", data);
    return response.data;
  } catch (error) {
    console.error("Register error", error);
    throw error;
  }
};

const getUserProfile = async () => {
  try {
    const response = await http.get("/api/me");
    return response.data;
  } catch (error) {
    console.error("Get Profile error", error);
    throw error;
  }
};

export { login, register, getAccessToken, getUserProfile };
