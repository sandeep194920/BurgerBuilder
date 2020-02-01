import React from "react";
import classes from "./BurgerIngredient.module.css";
const burgerIngredient = (props) => {
  return (
    <div>
      <div className={classes.Salad}></div>
      {/* Here we need to get props what we need ingredients and then render accordingly. So we need to modify this now */}
    </div>
  );
};
export default burgerIngredient;
