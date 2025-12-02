import axios from "axios";

let baseURL = "http://localhost:5000/api"; // default for dev

if (window.location.hostname.includes("raigrc.com")) {
  baseURL = "https://kaloob-api-vrdyzcnn7q-uc.a.run.app/api";
}

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
