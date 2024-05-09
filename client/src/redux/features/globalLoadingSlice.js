import { createSlice } from "@reduxjs/toolkit";

//? xử lý loading
export const globalLoadingSlice = createSlice({
  name: "GlobalLoading",
  initialState: {
    globalLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.appState = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
