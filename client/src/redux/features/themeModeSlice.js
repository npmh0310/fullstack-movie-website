import { createSlice } from "@reduxjs/toolkit";

//? SET THEME MODEL CHO PAGE (DARK -> WHITE)
export const themeModeSlice = createSlice({
  name: "ThemeMode",
  initialState: {
    themeMode: "dark"
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    }
  }
});

export const {
  setThemeMode
} = themeModeSlice.actions;

export default themeModeSlice.reducer;