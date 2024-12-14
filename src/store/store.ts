import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import todoReducer from './todoSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch