import axios from "axios";

const baseurl = axios.create({
  baseURL: "https://delveai-backend-ufzo.onrender.com",
  headers: { "Content-type": "application/json" },
});

export default baseurl;
