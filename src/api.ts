import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("accessToken");
      toast.error("Unauthorized.");
      // window.location.href = "/login"; // ✅ หรือใช้ React Router Redirect (ดูข้อ 3)
    }
    if (error.response && error.response.status === 400) {
      toast.error(error.response?.data?.error);
    }
    return Promise.reject(error);
  }
);

export default api;
