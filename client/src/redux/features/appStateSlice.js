import { createSlice } from "@reduxjs/toolkit";

//? Quản lý toàn cục. truy cập và cập nhật trạng thái từ bất kỳ component nào trong ứng dụng, và sử dụng trạng thái đó để điều chỉnh giao diện và hành vi của các thành phần giao diện.

export const appStateSlice = createSlice({
  name: "AppState",
  initialState: {
    appState: "",
  },
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
  },
});

export const { setAppState } = appStateSlice.actions;

export default appStateSlice.reducer;
