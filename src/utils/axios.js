import axios from "axios";
import config from "@/config";

const instance = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let interceptorLocaleId;

export const setInterceptorLocale = (locale = "vi") => {
  if (interceptorLocaleId !== undefined) {
    instance.interceptors.request.eject(interceptorLocaleId);
  }

  interceptorLocaleId = instance.interceptors.request.use(
    (config) => {
      config.params = { ...config.params, locale };
      // console.log("Request params with locale:", config.params);
      return config;
    },
    (error) => {
      console.error("Request error in interceptor:", error);
      return Promise.reject(error);
    }
  );
};

export default instance;
