import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" }
].map((control) => <BuildControl label={control.label} key={control.type} />);

// This is one way of creating controls. The other way is just to harcode this. Thi s approach helps if ingredients grow.

const buildControls = (props) => (
  <div className={classes.BuildControls}>{controls}</div>
);

export default buildControls;
