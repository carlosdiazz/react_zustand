import axios from "axios";
import { useAuthStore } from "../stores";

const tesloApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

//Todo interceptors
//Cualqueir peticion que pae por aca, usara este interceptor
tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
