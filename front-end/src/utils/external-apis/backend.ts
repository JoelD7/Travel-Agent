import axios from "axios";

export const backend = axios.create({
  baseURL: "https://backend-tripper.herokuapp.com/api",
  withCredentials: true,
});
