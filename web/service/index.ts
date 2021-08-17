import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3001/api",
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem("TOKEN");

  if (token && !config.headers?.Authorization) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default service;
