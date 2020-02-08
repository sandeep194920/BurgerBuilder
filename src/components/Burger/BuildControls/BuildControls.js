import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" }
];
// ].map((control) => <BuildControl label={control.label} key={control.type} />);
// can also uncomment the above line and modify JSX accordingly. In that case you can call only {controls} inside div below

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map((control) => (
        <BuildControl
          label={control.label}
          key={control.type}
          addIngredient={() => props.addIngredient(control.type)}
          removeIngredient={() => props.removeIngredient(control.type)}
          disabled={props.ingredients[control.type] <= 0 ? true : false} // My way for adding this disabled functionality
        />
      ))}
    </div>
  );
};

export default buildControls;
