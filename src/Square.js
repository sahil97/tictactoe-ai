import React from "react";
import "./index.css";

const Square = props => {
  let show = null;
  if (props.value === "X" || props.value === "O") {
    show = props.value;
  }
  return (
    <button className="square" onClick={props.onClick}>
      {show}
    </button>
  );
};

export default Square;
