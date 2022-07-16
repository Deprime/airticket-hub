/**
 * HTTP service
 */
import axios from "axios";

// Config
const API_URL  = import.meta.env.VITE_API_URL;
const DEV_MODE = import.meta.env.DEV;

// Create a instance of axios
const $axios = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }
});

/**
 * Pre config of axios request
 */
$axios.interceptors.request.use((config) => config);

/**
 * Pre config of axios response
 */
$axios.interceptors.response.use((response) =>
  response,
  async (error) => {
    if (DEV_MODE) {
      console.debug(error);
    }
    return Promise.reject(error);
  },
);

export default $axios;
