//@연습용 코드 쓰지 않음 => apis => @core.js로 단일화

import axios from "axios";
import { accessToken } from "./accessTokens";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

//요청 인터셉터
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//응답 인터셉터
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("Axios interceptor for 4xx range status code called!");
    return Promise.reject(error);
  }
);
