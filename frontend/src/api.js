// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend base URL
  withCredentials: true, // allow cookies if using JWT cookies
});

export default API;
