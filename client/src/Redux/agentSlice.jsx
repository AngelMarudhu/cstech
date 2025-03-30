import { createSlice } from "@reduxjs/toolkit";
import {
  createAgent,
  deleteAgent,
  deleteAllTasks,
  editAgentList,
} from "../Feature/agentFeature";

const initialState = {
  createAgentState: {
    loading: false,
    isCreated: false,
    error: null,
  },
  deleteAgentState: {
    loading: false,
    isDeleted: false,
    error: null,
  },
  editAgentState: {
    loading: false,
    isEdited: false,
    error: null,
  },
  deleteAllTasksState: {
    loading: false,
    isDeleted: false,
    error: null,
  },
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    resetDeleteState: (state) => {
      state.deleteAgentState.loading = false;
      state.deleteAgentState.isDeleted = false;
      state.deleteAgentState.error = null;
    },

    resetEditState: (state) => {
      state.editAgentState.loading = false;
      state.editAgentState.isEdited = false;
      state.editAgentState.error = null;
    },

    resetDeleteAllTasksState: (state) => {
      state.deleteAllTasksState.loading = false;
      state.deleteAllTasksState.isDeleted = false;
      state.deleteAllTasksState.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAgent.pending, (state) => {
      state.createAgentState.loading = true;
      state.createAgentState.isCreated = false;
      state.createAgentState.error = null;
    });
    builder.addCase(createAgent.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.createAgentState.loading = false;
      state.createAgentState.isCreated = true;
      state.createAgentState.error = null;
    });
    builder.addCase(createAgent.rejected, (state, action) => {
      // console.log(action.payload);
      state.createAgentState.loading = false;
      state.createAgentState.isCreated = false;
      state.createAgentState.error = action.payload.error;
    });

    // Delete Agent Reducer

    builder.addCase(deleteAgent.pending, (state) => {
      state.deleteAgentState.loading = true;
      state.deleteAgentState.isDeleted = false;
      state.deleteAgentState.error = null;
    });

    builder.addCase(deleteAgent.fulfilled, (state, action) => {
      state.deleteAgentState.loading = false;
      state.deleteAgentState.isDeleted = true;
      state.deleteAgentState.error = null;
    });

    builder.addCase(deleteAgent.rejected, (state, action) => {
      state.deleteAgentState.loading = false;
      state.deleteAgentState.isDeleted = false;
      state.deleteAgentState.error = action.payload.error;
    });

    // Edit Agent Reducer

    builder.addCase(editAgentList.pending, (state) => {
      state.editAgentState.loading = true;
      state.editAgentState.isEdited = false;
      state.editAgentState.error = null;
    });

    builder.addCase(editAgentList.fulfilled, (state, action) => {
      state.editAgentState.loading = false;
      state.editAgentState.isEdited = true;
      state.editAgentState.error = null;
    });

    builder.addCase(editAgentList.rejected, (state, action) => {
      state.editAgentState.loading = false;
      state.editAgentState.isEdited = false;
      state.editAgentState.error = action.payload.error;
    });

    // Delete All Tasks Reducer

    builder.addCase(deleteAllTasks.pending, (state) => {
      state.deleteAllTasksState.loading = true;
      state.deleteAllTasksState.isDeleted = false;
      state.deleteAllTasksState.error = null;
    });
    builder.addCase(deleteAllTasks.fulfilled, (state, action) => {
      state.deleteAllTasksState.loading = false;
      state.deleteAllTasksState.isDeleted = true;
      state.deleteAllTasksState.error = null;
    });
    builder.addCase(deleteAllTasks.rejected, (state, action) => {
      state.deleteAllTasksState.loading = false;
      state.deleteAllTasksState.isDeleted = false;
      state.deleteAllTasksState.error = action.payload.error;
    });
  },
});

export const { resetDeleteState, resetEditState, resetDeleteAllTasksState } =
  agentSlice.actions;

export default agentSlice.reducer;
