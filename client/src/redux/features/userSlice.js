import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
  },
  reducers: {
    // quản lý login
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn"); // xóa token khỏi local storage
      } else {
        // token tồn tại
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token); // token sẽ được lưu vào localStorage
      }
      state.user = action.payload; // state.user được cập nhật với action.payload
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorites: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = [
        ...state.listFavorites.filter(
          (e) => e.mediaId.toString() !== mediaId.toString()
        ),
      ];
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { setUser, setListFavorites, removeFavorites, addFavorite } =
  userSlice.actions;

  export default userSlice.reducer