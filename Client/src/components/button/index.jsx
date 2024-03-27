import React from "react";
import "./style.css";

const MyButton = (props) => {
  return (
    <div>
  <button onClick={props.onClick} className="custom-button">
        {props.content}
      </button>
    </div>
  );
};

export default MyButton;
