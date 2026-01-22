import axios from "axios";
import { logoutUser } from "../services/authService";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
API.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err)
  }
)



export default API;