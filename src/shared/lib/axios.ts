import axios from "axios";
import { getEnv } from "@/lib/get-runtime-env";

const API_PUBLIC_VERSION = "/api/v1/public";
const API_PRIVATE_VERSION = "/api/v1";

function getApiBaseUrl(): string {
  return getEnv('NEXT_PUBLIC_API_URL', 'https://desa-api.muaraenimkab.go.id');
}

const axiosConfig = axios.create({
    baseURL: getApiBaseUrl() + API_PUBLIC_VERSION,
    headers: {
      Accept: "application/json",
    },
    timeout: 300000
  });
  
axiosConfig.interceptors.request.use(
    function (config) {
        config.headers["x-village-id"] = getEnv("NEXT_PUBLIC_VILLAGE_ID");
        config.baseURL = getApiBaseUrl() + API_PUBLIC_VERSION;
        return config;
    },
    function (error) {
        console.error("Request error:", error);
        return Promise.reject(error); 
    }
);

axiosConfig.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 404) {
            return { data: null }; 
        }
        return Promise.reject(error);
    }
);

export const axiosConfigPrivate = axios.create({
  baseURL: getApiBaseUrl() + API_PRIVATE_VERSION,
  headers: {
    Accept: "application/json",
  },
});

axiosConfigPrivate.interceptors.request.use(
  async function (config) {
    config.headers["x-village-id"] = getEnv("NEXT_PUBLIC_VILLAGE_ID");
    config.baseURL = getApiBaseUrl() + API_PRIVATE_VERSION;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfigPrivate.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 404) {
            return { data: null }; 
        }
        return Promise.reject(error);
    }
);

export default axiosConfig;
