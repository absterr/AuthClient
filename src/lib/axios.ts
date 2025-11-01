import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        await api.post("/auth/refresh", null, { withCredentials: true });
        return api(error.config);
      } catch (error) {
        window.location.href = "/login";
      }
    }
    throw error;
  }
);

export default api;
