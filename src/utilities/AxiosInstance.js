import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default AxiosInstance;

// baseURL: "https://food-track-bend.onrender.com",
