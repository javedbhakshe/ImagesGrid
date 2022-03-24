import axios from "axios";
const baseUrl = "https://pixabay.com/api/";
const AUTH_KEY = "6473511-0417f2cad683f1bee54cafe15";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (request) {
    request.params.key = AUTH_KEY;
    return request;
  },
  function (error, response) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
