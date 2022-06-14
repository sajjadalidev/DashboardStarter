import axios from "axios";
import { API_BASE_URL } from "../config/index";
import { requestInterceptor } from "./interceptor";

const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30 * 1000,
});
request.interceptors.request.use(requestInterceptor);

const generalApi = {
  login: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .post("login", payload)
        .then((res) => {
          if (res.data.data) {
            this.setSession(res.data.data.token, res.data.data.role);

            resolve(res.data.data);
          } else {
            reject(res.data.error);
          }
        })
        .catch((error) => {
          reject(error.res.data);
        });
    });
  },
  uploadImg: (payload) => {
    return new Promise((resolve, reject) => {
      request
        .post("/uploadImage", payload)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
  logOut: () => {
    return new Promise((resolve, reject) => {
      request
        .post("logout", payload)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
  getStates: () => {
    return new Promise((resolve, reject) => {
      request
        .get("states")
        .then((res) => {
          const { data } = res;
          resolve({ data });
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
  getCities: (id) => {
    return new Promise((resolve, reject) => {
      request
        .get(`cities/${id}`)
        .then((res) => {
          const { data } = res;
          resolve({ data });
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
};

export default generalApi;
