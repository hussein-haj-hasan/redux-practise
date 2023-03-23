import store from "../../../store";
export type counterInitial = {
  count: number;
};
export type AppDispatch = typeof store.dispatch;

export type stateType = ReturnType<typeof store.getState>;
export type getStateType = typeof store.getState;
