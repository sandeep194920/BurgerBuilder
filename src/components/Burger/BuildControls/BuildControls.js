import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];
// ].map((control) => <BuildControl label={control.label} key={control.type} />);
// can also uncomment the above line and modify JSX accordingly. In that case you can call only {controls} inside div below

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          label={control.label}
          key={control.type}
          //addIngredient={() => props.addIngredient(control.type)} // My way of adding Ingredient
          // removeIngredient={() => props.removeIngredient(control.type)} // My way of removing Ingredient
          // disabled={props.ingredients[control.type] <= 0 ? true : false} // My way for adding this  disabled functionality
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        onClick={props.ordered}
        className={classes.OrderButton}
        disabled={!props.purchasable}
      >
        {props.isAuth ? "ORDER NOW" : "SIGNUP TO ORDER"}
      </button>
    </div>
  );
};

export default buildControls;
