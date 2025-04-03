import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentsSlice";
import teacherReducer from "./teachersSlice";
import userReducer from "./userSlice";
import productReducer from "./storeSlice";
const store = configureStore({
  reducer: {
    students: studentReducer,
    teachers: teacherReducer,
    products: productReducer,
    user:userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
