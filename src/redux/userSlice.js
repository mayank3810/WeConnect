import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userLogin(state, action) {
      return {
        currentUser: action.payload.user,
      };
    },
  },
});

export const { userLogin } = userSlice.actions;
export default userSlice.reducer;
