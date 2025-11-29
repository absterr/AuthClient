import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (
      error.response?.status === 401 &&
      !error.config._retry &&
      error.config.url !== "/auth/refresh"
    ) {
      error.config._retry = true;
      await api.post("/auth/refresh", null, { withCredentials: true });
      return api(error.config);
    }
  }
);

export default api;
