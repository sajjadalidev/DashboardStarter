import _ from "lodash";
import instance from "app/services/jwtService/jwtService";
export const requestInterceptor = async (config) => {
  try {
    const token = instance.getAccessToken();

    config.headers.common.Authorization = `Bearer ${token}`;
  } catch (e) {
    console.log(e);
  }

  return config;
};

export const errorInterceptor = (error) => {
  if (error.message === "Network Error") {
    return Promise.reject({
      message: error?.response?.message,
      code: 500,
    });
  }
  if (error.response) {
    if (
      error.response.status === 401 &&
      error.response.config &&
      !error.response.config.__isRetryRequest // eslint-disable-line no-underscore-dangle
    ) {
    }
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

/**
 * Custom Api Wrapper to handle unhandled exceptions/error
 * @param {object} api - api object containing all api functions e.g. { login: (data) => {}, logout: () => {}}
 * @param {array} exclude - Array of function names in api which we don't want to add this error handling
 */
export const apiWrapper = (api, exclude = []) => {
  const newApi = {};
  _.keys(api).forEach((func) => {
    if (_.includes(exclude, func)) {
      newApi[func] = api[func];
      return;
    }
    newApi[func] = (...args) => {
      return new Promise((resolve, reject) => {
        api[func](...args)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (
              error &&
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              return reject({ message: error.response.data.message });
            }
            if (error && error.message) {
              return reject(error);
            }
            return reject({
              message: "Something went wrong.  Please try again.",
              code: 500,
            });
          });
      });
    };
  });
  return newApi;
};
