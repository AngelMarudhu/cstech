import { createSlice } from "@reduxjs/toolkit";
import { uploadFile } from "../Feature/uploadFileFeature";

const initialState = {
  loading: false,
  error: null,
  isUploaded: false,
  uploadedMessage: "",
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUpload: (state) => {
      state.loading = false;
      state.isUploaded = false;
      state.uploadedMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isUploaded = false;
    });

    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.isUploaded = true;
      state.uploadedMessage = action.payload.message;
    });

    builder.addCase(uploadFile.rejected, (state, action) => {
      state.loading = false;
      state.isUploaded = false;
      state.error = action.payload.error;
      state.uploadedMessage = "";
    });
  },
});

export const { resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
