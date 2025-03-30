import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:9000/task";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export const uploadFile = createAsyncThunk(
  "upload-file",
  async (file, thunkAPI) => {
    try {
      const response = await api.post("/upload", file);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);
