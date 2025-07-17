import { configureStore } from '@reduxjs/toolkit'

// Importing Slice reducers
import CounterSlice from "@/lib/features/counterSlice";
import UserSlice from "@/lib/features/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterSlice,
      user: UserSlice,
    },
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']