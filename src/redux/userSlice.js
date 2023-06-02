import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { composeWithDevTools } from "redux-devtools-extension";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

// const checkLogin = async () => {
//   AsyncStorage.getItem("user").then((currentUser) => {
//     if (currentUser != null || currentUser != undefined) {
//       return JSON.parse(currentUser);
//     } else return null;
//   });
// };

const initialState = {
  currentUser: null,
};

export const checkLogin = createAsyncThunk("user/checkLogin", async () => {
  const res = await AsyncStorage.getItem("user");
  return res;
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await AsyncStorage.clear();
  return null;
});

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userLogin(state, action) {
      return {
        currentUser: action.payload.user,
      };
    },
    userLogout(state, action) {
      return {
        currentUser: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      console.log(action.payload);
      return (currentUser = JSON.parse(action.payload));
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      console.log("Logout builder" + action.payload);
      return (currentUser = action.payload);
    });
  },
  composeWithDevTools,
});
// composeWithDevTools

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
