import { createSlice } from "@reduxjs/toolkit";
import { signInUser, logoutUser } from "../firebase/authService";

export const loginUser = (email, password) => async (dispatch) => {
  const result = await signInUser(email, password);
  if (result.success) {
    dispatch(setUser(result)); 
  }
  return result;
};

export const logoutUserAction = () => async (dispatch) => {
  const result = await logoutUser();
  if (result.success) {
    dispatch(logout()); 
  }
  return result;
};

const initialState = {
  user: null,
  role: localStorage.getItem("role") || null, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      localStorage.setItem("role", state.role); 
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      localStorage.removeItem("role"); 
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
