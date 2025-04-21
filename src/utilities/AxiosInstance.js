import axios from "axios";
const AxiosInstanceInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://food-track-bend.onrender.com",
});

export default AxiosInstanceInstance;
