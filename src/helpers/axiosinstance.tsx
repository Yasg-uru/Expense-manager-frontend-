import axios from "axios";
const baseURL: string = "http://localhost:8000";
const axiosInstance = axios.create({
  baseURL,
});
export default axiosInstance;
