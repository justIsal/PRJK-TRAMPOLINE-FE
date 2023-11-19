import axios from "axios";
import { refreshToken } from "./refreshToken";
import { useDispatch } from "react-redux";
import { setAccessToken, setId } from "../redux/authSlice";
import { store } from "../redux/store";
import { jwtDecode } from "jwt-decode";

const axiosJwt = axios.create({
    baseURL: 'http://localhost:5174'
});
let isRefreshing = false;
axiosJwt.interceptors.request.use(
  async(config)=> {
    const accessToken = store.getState().token.accessToken;
    // const id = store.getState().token.id;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
    try {
      const req = await refreshToken();
      config.headers.Authorization = `Bearer ${req.accessToken}`;
      store.dispatch(setAccessToken(req.accessToken))

      return config;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  }
)
axiosJwt.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        (error.response && error.response.status === 401) ||
        (error.response && error.response.status === 403) ||
        (!error.response && !store.getState().token.accessToken)
      ) {
        if(!isRefreshing){
          isRefreshing = true;

          // originalRequest._retry = true;
          try {
            const req = await refreshToken();
            originalRequest.headers.Authorization = `Bearer ${req.accessToken}`;
            store.dispatch(setAccessToken(req.accessToken))
            store.dispatch(setId(jwtDecode(req.accessToken).userId))

            return axiosJwt(originalRequest);
          } catch (refreshError) {
            console.error('Error refreshing access token:', refreshError);
            return Promise.reject(refreshError);
          }finally {
            isRefreshing = false;
          }
        }
      }
  
      return Promise.reject(error);
    }
);
export default axiosJwt;
