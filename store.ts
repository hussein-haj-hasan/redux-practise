import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CounterSlice from "./src/state/Counter/CounterSlice";
const store = configureStore({ reducer: combineReducers({ CounterSlice }) });
export default store;
