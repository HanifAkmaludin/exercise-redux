import { configureStore } from '@reduxjs/toolkit'

import CounterSlice from './features/counterSlice'
import UserSlice from "./features/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterSlice,
      user: UserSlice,
      // Add other slices here as needed
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']