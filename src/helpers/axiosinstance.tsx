import axios from "axios";
// const baseURL: string = "http://localhost:8000";
const baseURL: string = "https://expense-manager-backend-orcin.vercel.app";
const axiosInstance = axios.create({
  baseURL,
});
export default axiosInstance;
