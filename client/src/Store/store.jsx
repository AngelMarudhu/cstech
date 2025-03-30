import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice";
import agentReducer from "../Redux/agentSlice";
import uploadReducer from "../Redux/uploadSlice";
import { fetchAgentTaskList } from "../Feature/agentFeature";
import { fetchAgentList } from "../Feature/agentFeature";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    agent: agentReducer,
    upload: uploadReducer,
    [fetchAgentTaskList.reducerPath]: fetchAgentTaskList.reducer,
    [fetchAgentList.reducerPath]: fetchAgentList.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      fetchAgentTaskList.middleware,
      fetchAgentList.middleware
    );
  },
});
