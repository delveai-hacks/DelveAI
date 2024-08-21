import axios from "axios";
// https://delveai-backend.onrender.com
const baseurl = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: { "Content-type": "application/json" },
});

export default baseurl;
