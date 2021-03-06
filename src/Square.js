import React from "react";
import "./index.css";

const Square = props => {
  let show = null;
  let disabled = false;
  if (props.value === "X" || props.value === "O") {
    show = props.value;
    disabled = true;
  }
  if (props.winState) {
    disabled = true;
  }
  return (
    <button
      className={"square " + show}
      onClick={props.onClick}
      disabled={disabled}
    >
      {show}
    </button>
  );
};

export default Square;
