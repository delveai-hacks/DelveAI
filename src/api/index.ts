import axios from "axios";

const baseurl = axios.create({
  baseURL: "https://delveai-backend.onrender.com",
  headers: { "Content-type": "application/json" },
});

export default baseurl;
