import axios from "axios";
const baseURL: string = "https://expense-manager-backend-orcin.vercel.app";
const axiosInstance = axios.create({
  baseURL,
});
export default axiosInstance;
