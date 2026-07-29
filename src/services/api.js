import axios from "axios";

const API = axios.create({
  baseURL: "https://aivoa-pharma-complaints-1.onrender.com",
});

export default API;