import axios from "axios";

export const backend = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});