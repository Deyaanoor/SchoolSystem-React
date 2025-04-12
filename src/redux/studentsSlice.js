import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addStudent, getStudents, deleteStudent, updateStudent } from "../firebase/studentService";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async ({ lastDoc, reset }, { rejectWithValue }) => {
    try {
      const response = await getStudents(lastDoc, 10);
      return { students: response.students, lastDoc: response.lastDoc, reset };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewStudent = createAsyncThunk(
  "students/addNewStudent",
  async (student, { rejectWithValue }) => {
    try {
      await addStudent(student);
      return student;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeStudent = createAsyncThunk(
  "students/removeStudent",
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudent(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editStudent = createAsyncThunk(
  "students/editStudent",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      await updateStudent(id, updatedData);
      return { id, updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
    hasMore: true,
    lastDoc: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && action.payload.students) {
          if (action.payload.reset) {
            state.students = action.payload.students;
          } else {
            const existingIds = new Set(state.students.map(student => student.id));
            const newStudents = action.payload.students.filter(student => !existingIds.has(student.id));
            state.students = state.students.concat(newStudents);
          }

          state.hasMore = action.payload.students.length > 0;
          state.lastDoc = action.payload.lastDoc;
        } else {
          state.hasMore = false;
        }
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addNewStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student.id !== action.payload);
        
        state.loading = false;
      })
      .addCase(removeStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.students.findIndex(student => student.id === id);
        if (index !== -1) {
          state.students[index] = { ...state.students[index], ...updatedData };
        }
        state.loading = false;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
