import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {/* <input />  If we use input here like this, then its not flexible and this component cannot be used for other type of inputs such as select, textarea and so on. 
            Hence we use switch case at the top and render this dynamically as per the passed prop*/}
      {inputElement}
      {/* This inputElement can be anything like input, textarea and so on */}
    </div>
  );
};
export default input;
