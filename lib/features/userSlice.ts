"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CounterState {
  users: User[];
  isLoading: boolean;
}

const initialState: CounterState = {
  users: [],
  isLoading: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setUsers } = UserSlice.actions;
export default UserSlice.reducer;