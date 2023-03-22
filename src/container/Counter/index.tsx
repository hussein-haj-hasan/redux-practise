import React from "react";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
  asyncIncrementByAmount,
} from "../../state/Counter/CounterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import reactLogo from "../../assets/react.svg";

function Counter() {
  const [text, setText] = useState("");
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  console.log(count);
  return (
    <>
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <h4>{count}</h4>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
      <div className="card">
        <button
          onClick={() => {
            if (text) dispatch(incrementByAmount(parseInt(text)));
          }}
        >
          Add Amount
        </button>
        <input
          type="number"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (text) dispatch(asyncIncrementByAmount(parseInt(text)));
          }}
        >
          Add Amount Async
        </button>
      </div>
    </>
  );
}

export { Counter };
