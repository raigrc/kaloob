import axios from "axios";

let baseURL = "http://localhost:5000/api"; // default for dev

// Use production API for anything that's NOT localhost
if (
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1"
) {
  baseURL = "https://kaloob-api-vrdyzcnn7q-uc.a.run.app/api";
}

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
