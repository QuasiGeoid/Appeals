import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "@/apiConfig";
import store from "@/store";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = store.state.token;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Helper function for API requests
/**
 * Makes an API request using the pre-configured axios instance.
 * @param {string} method - The HTTP method (get, post, patch).
 * @param {string} url - The URL for the API request.
 * @param {Object} [params={}] - The query parameters or data for the request.
 * @param {Object} [options={}] - Additional axios request options (headers, baseURL, etc.).
 * @returns {Promise<Object>} - The response data from the API.
 * @throws Will throw an error if the request fails.
 */
export const makeRequest = async (method, url, params = {}, options = {}) => {
  try {
    let response;

    if (method === "get") {
      response = await apiClient.get(url, { ...options, params });
    } else if (method === "post") {
      response = await apiClient.post(url, params, options);
    } else if (method === "patch") {
      response = await apiClient.patch(url, params, options);
    }

    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const login = async (username, password) => {
  return makeRequest("post", ENDPOINTS.LOGIN, { username, password });
};

export const fetchAppeals = async (params = {}) => {
  return makeRequest("get", ENDPOINTS.APPEALS, params);
};

export const createAppeal = async (appealData) => {
  return makeRequest("post", ENDPOINTS.APPEALS, appealData);
};

export const updateAppeal = async (appealId, appealData) => {
  return makeRequest("patch", `${ENDPOINTS.APPEALS}${appealId}/`, appealData);
};

export const fetchPremises = async (params = {}) => {
  return makeRequest("get", ENDPOINTS.USER_PREMISES, params);
};

export const fetchApartments = async (params = {}) => {
  return makeRequest("get", ENDPOINTS.APARTMENTS, params);
};
