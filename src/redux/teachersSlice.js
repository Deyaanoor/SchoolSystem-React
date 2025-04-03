import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTeacher, getTeachers, deleteTeacher, updateTeacher } from "../firebase/teacherService";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async ({ lastDoc, reset }, { rejectWithValue }) => {
    try {
      const response = await getTeachers(lastDoc, 10);
      return { teachers: response.teachers, lastDoc: response.lastDoc, reset };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTeacher = createAsyncThunk(
  "teachers/addNewTeacher",
  async (teacher, { rejectWithValue }) => {
    try {
      await addTeacher(teacher);
      return teacher;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const removeTeacher = createAsyncThunk(
  "teachers/removeTeacher",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTeacher(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTeacher = createAsyncThunk(
  "teachers/editTeacher",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      await updateTeacher(id, updatedData);
      return { id, updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    loading: false,
    error: null,
    hasMore: true,
    lastDoc: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && action.payload.teachers) {
          if (action.payload.reset) {
            state.teachers = action.payload.teachers;
          } else {
            const existingIds = new Set(state.teachers.map(teacher => teacher.id));
            const newteachers = action.payload.teachers.filter(teacher => !existingIds.has(teacher.id));
            state.teachers = state.teachers.concat(newteachers);
          }

          state.hasMore = action.payload.teachers.length > 0;
          state.lastDoc = action.payload.lastDoc;
        } else {
          state.hasMore = false;
        }
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addNewTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(teacher => teacher.id !== action.payload);
        state.loading = false;
      })
      .addCase(removeTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTeacher.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.teachers.findIndex(teacher => teacher.id === id);
        if (index !== -1) {
          state.teachers[index] = { ...state.teachers[index], ...updatedData };
        }
        state.loading = false;
      })
      .addCase(editTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teacherSlice.reducer;
