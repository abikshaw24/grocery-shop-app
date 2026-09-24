import axios from "axios";

const API = axios.create({
  baseURL: "https://grocery-shop-app-mfdq.onrender.com/api"
});

export default API;