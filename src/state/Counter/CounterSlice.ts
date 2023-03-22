import { createSlice } from "@reduxjs/toolkit";
import { counterInitial, AppDispatch, stateType } from "./types";
export const CounterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 } as counterInitial,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});
export const asyncIncrementByAmount: any =
  (amount: number) => (dispatch: AppDispatch) => {
    setTimeout(() => dispatch(incrementByAmount(amount)), 3000);
  };

export const selectCount = (state: stateType) => state.CounterSlice.count;
export const { increment, decrement, incrementByAmount } = CounterSlice.actions;
export default CounterSlice.reducer;
