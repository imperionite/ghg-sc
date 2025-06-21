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

const submitGHGData = async (data) => {
  try {
    const response = await http.post("/api/ghg/submit", data);
    return response.data;
  } catch (error) {
    console.error("GHG submission error", error);
    throw error;
  }
};

export const getCommunitySummary = async () => {
  const res = await http.get("/api/ghg/community-summary");
  return res.data;
};

export const getCommunityTypeSummary = async () => {
  const res = await http.get("/api/ghg/aggregated-by-type");
  return res.data;
};

export const getSectoralByRegion = async () => {
  const res = await http.get("/api/ghg/sectoral-by-region");
  return res.data;
};

export const getRegionalTrends = async (regions = []) => {
  const res = await http.get(`/api/ghg/regional-trend-summary`);
  const filteredData = res.data;

  if (regions.length > 0) {
    const filtered = {};
    Object.entries(filteredData).forEach(([region, data]) => {
      const isMatch = regions.some((selectedRegion) =>
        region.toLowerCase().includes(selectedRegion.toLowerCase())
      );
      if (isMatch) {
        filtered[region] = data;
      }
    });
    return filtered;
  }

  return filteredData;
};

export const getSectoralTrend = async () => {
  const res = await http.get("/api/ghg/sectoral-trend");
  return res.data;
};

export const getSectorByCommunityType = async () => {
  const res = await http.get("/api/ghg/sectoral-by-community-type");
  return res.data;
};

export const getTimeseries = async () => {
  const res = await http.get("/api/ghg/timeseries");
  return res.data;
};

export { login, register, getAccessToken, getUserProfile, submitGHGData };
