import axios, { AxiosInstance } from 'axios';

export const ERROR_GENERAL = 99999;

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosClient: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {},
  paramsSerializer: (params) => {
    return new URLSearchParams(params).toString();
  },
});
