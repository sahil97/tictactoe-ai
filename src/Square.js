import React from "react";
import "./index.css";

const Square = props => {
  let show = null;
  let disabled = false;
  if (props.value === "X" || props.value === "O") {
    show = props.value;
    disabled = true;
  }
  return (
    <button className="square" onClick={props.onClick} disabled={disabled}>
      {show}
    </button>
  );
};

export default Square;
