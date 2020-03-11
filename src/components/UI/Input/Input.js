import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  // We are using classes.InputElement on each input which is fine until we use validation. If we have a validation check and
  // it fails then we need to change the color of the inputElement and for this we need to add another class. So let's do
  // that dynamically now.

  // Code below responsible for adding dynamic class for showing error (red color on the inputElement) if validation fails
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  // Code above responsible for adding dynamic class for showing error (red color on the inputElement) if validation fails

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      {/* <label className={classes.Label}>{props.label}</label> */}
      {/* Label is not used anymore */}
      {/* <input />  If we use input here like this, then its not flexible and this component cannot be used for other type of inputs such as select, textarea and so on. 
            Hence we use switch case at the top and render this dynamically as per the passed prop*/}
      {inputElement}
      {/* This inputElement can be anything like input, textarea and so on */}
    </div>
  );
};
export default input;
