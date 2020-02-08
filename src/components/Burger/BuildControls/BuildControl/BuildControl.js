import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      // onClick={props.removeIngredient} // My way of onClick for add-ingredient
      // disabled={props.disabled} //My way for adding this disabled functionality
    >
      Less
    </button>
    <button
      className={classes.More}
      // onClick={props.addIngredient} // My way of onClick for remove-ingredient
      onClick={props.added}
    >
      More
    </button>
  </div>
);

export default buildControl;
