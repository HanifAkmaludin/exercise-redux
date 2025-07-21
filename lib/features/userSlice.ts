"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User{
  id: string;
  name: string;
  email: string;
}
export interface UserState {
  users: User[];
  loading: boolean;
  pengguna: User[];
}

const initialState: UserState = {
  users: [],
  loading: false,
  pengguna: []
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log(state, 26);
      console.log(action, 27);
      state.loading = action.payload;
    },
    setListUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setListPengguna: (state, action: PayloadAction<User[]>) => {
      console.log(action, 36);
      state.pengguna = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setListUsers, setListPengguna } = UserSlice.actions;
export default UserSlice.reducer;