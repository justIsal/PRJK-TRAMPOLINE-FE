import axios from "axios";
import { refreshToken } from "./refreshToken";
import { useDispatch } from "react-redux";
import { clearData, setToken,setUser } from "../redux/authSlice";
import { store } from "../redux/store";
import { jwtDecode } from "jwt-decode";

const axiosJwt = axios.create({
    baseURL: 'http://localhost:5174',
    // timeout: 5000,
    // headers: {
    //   Authorization: `Bearer ${store.getState().token.token}`
    // }
});

axiosJwt.interceptors.request.use(
  async (config) => {
    const accessToken = store.getState().token.token;
    const expireIn = jwtDecode(accessToken).exp * 1000;
    const now = new Date().getTime();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config
      // if (expireIn < now) {
      //   try {
      //     const newAccessToken = await refreshToken();
      //     config.headers.Authorization = `Bearer ${newAccessToken}`;
      //     store.dispatch(setToken(newAccessToken));
      //     console.log('masuk');
      //   } catch (error) {
      //     console.error('Error refreshing access token:', error);
      //     throw error;
      //   }
      // }
      // return config; 
    }
    // return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
)





const isUnauthorizedError = (error) => {
  const {
      response: { status, statusText },
  } = error;
  return status === 401;
}
let refreshingFunc = undefined;
axiosJwt.interceptors.response.use(
  (res) =>  res,
  async (error) => {
      const originalConfig = error.config;
      const token = store.getState().token.token
      // if we don't have token in local storage or error is not 401 just return error and break req.
      if (!token && !isUnauthorizedError(error)) {
          return Promise.reject(error);
      }
      try {
          // the trick here, that `refreshingFunc` is global, e.g. 2 expired requests will get the same function pointer and await same function.
          if (!refreshingFunc) refreshingFunc = refreshToken()
              
          const newToken = await refreshingFunc;

          store.dispatch(setToken(newToken))
          originalConfig.headers.Authorization = `Bearer ${newToken}`;

          // retry original request
          try {
            return await axiosJwt.request(originalConfig);
          } catch(innerError) {
              // if original req failed with 401 again - it means server returned not valid token for refresh request
            if (isUnauthorizedError(innerError)) {
              throw innerError;
            }                  
          }
      } catch (err) {
          store.dispatch(clearData)
          window.location.href = '/admin';

      } finally {
        refreshingFunc = undefined;
      }
  },
)
export default axiosJwt;
