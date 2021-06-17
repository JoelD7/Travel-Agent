import axios from "axios";

const jwt = localStorage.getItem("jwt") !== null ? localStorage.getItem("jwt") : "";

export const backend = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${jwt}`,
  // },
});
