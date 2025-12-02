import axios from "axios";

let baseURL = "http://localhost:5000/api"; // default for dev

if (window.location.hostname.includes("raigrc.com")) {
  baseURL = "https://kaloob-api.raigrc.com/api";
}

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
