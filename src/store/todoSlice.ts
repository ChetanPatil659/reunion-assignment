import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [] as any [],
  loading: false,
  error: "",
};

export const createTodo = createAsyncThunk("todo/create", async (data) => {
  try {
    const response = await axios("http://localhost:8000/todo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: data,
    });

    return await response.data;
  } catch (error) {
    return error;
  }
});

export const updateTodo = createAsyncThunk("todo/update", async (data: { _id: string }) => {
  try {
    
    const response = await axios(
      `http://localhost:8000/todo/update/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: data,
      }
    );

    return await response.data;
  } catch (error) {
    return error;
  }
});

export const getTodo = createAsyncThunk("todo/getTodos", async () => {
    try {
      const response = await axios(
        `http://localhost:8000/todo/getTodos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
  
      return await response.data;
    } catch (error) {
      return error;
    }
  });

  export const removeTodo = createAsyncThunk("todo/remove", async () => {
    try {
      return;
    } catch (error) {
      return error;
    }
  });

export const todoReducer = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = [...state?.todos, action.payload.todo];
    })
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    })

    builder.addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [...state.todos, action.payload.todo];
      })
      builder.addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      builder.addCase(getTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [...action.payload.todos];
      })
      builder.addCase(getTodo.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(getTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      builder.addCase(removeTodo.fulfilled, (state) => {
        state.loading = false;
        state.todos = [];
      })
      builder.addCase(removeTodo.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
  },
});

export default todoReducer.reducer;
