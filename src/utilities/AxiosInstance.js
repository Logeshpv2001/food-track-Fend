import axios from "axios";
const AxiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://food-track-bend.onrender.com",
  withCredentials: true,
});

export default AxiosInstance;
