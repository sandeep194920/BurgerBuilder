import React from "react";
import classes from "./Button.module.css";

const button = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
    disabled={props.disabled} // This was added when this button was implemented in ContactData Button to disable the ORDER btn when isFormValid is false.
  >
    {props.children}
  </button>
);

export default button;
