import { createSlice } from "@reduxjs/toolkit";
import { signInUser, logoutUser } from "../firebase/authService";

// تسجيل دخول المستخدم
export const loginUser = (email, password) => async (dispatch) => {
  const result = await signInUser(email, password);
  if (result.success) {
    dispatch(setUser(result));  // تحديد المستخدم و الـ role
  }
  return result;
};

// تسجيل الخروج
export const logoutUserAction = () => async (dispatch) => {
  const result = await logoutUser();
  if (result.success) {
    dispatch(logout());  // حذف الـ user و الـ role من الـ Redux
  }
  return result;
};

const initialState = {
  user: null,
  role: localStorage.getItem("role") || null, // نجيب الـ role من localStorage إذا موجود
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // لتحديد المستخدم و الـ role
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      localStorage.setItem("role", state.role); // تخزين الـ role فقط في localStorage
    },
    // لتسجيل الخروج
    logout: (state) => {
      state.user = null;
      state.role = null;
      localStorage.removeItem("role"); // حذف الـ role من localStorage
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
