import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:9000/agent";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export const createAgent = createAsyncThunk(
  "create-agent",
  async (agent, thunkAPI) => {
    try {
      const response = await api.post("/create-agent", agent);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const deleteAgent = createAsyncThunk(
  "delete-agent",
  async (id, thunkAPI) => {
    // console.log(id);
    try {
      const response = await api.delete(`/delete-agent/${id}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const fetchAgentList = createApi({
  reducerPath: "fetchAgentList",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      fetchAgentList: builder.query({
        query: () => {
          return {
            url: "/fetch-agents",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const fetchAgentTaskList = createApi({
  reducerPath: "fetchAgentTaskList",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      fetchAgentTaskList: builder.query({
        query: () => {
          return {
            url: "/fetch-agent-tasks",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const editAgentList = createAsyncThunk(
  "edit-agent",
  async ({ id, agent }, thunkAPI) => {
    try {
      const response = await api.put(`edit-agent/${id}`, agent);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const deleteAllTasks = createAsyncThunk(
  "delete-all-tasks",
  async (_, thunkAPI) => {
    try {
      const response = await api.delete("/delete-all-task");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const { useFetchAgentTaskListQuery } = fetchAgentTaskList;
export const { useFetchAgentListQuery } = fetchAgentList;
