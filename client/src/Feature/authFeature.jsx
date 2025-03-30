import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:9000/admin";

// admin@gmail.com

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data || "Something went wrong",
      });
    }
  }
);
