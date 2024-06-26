import axios from "axios";

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

