import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "../Burger/Burger.module.css";

const burger = (props) => {
  // We now get ingredients prop which is an object {salad : 1, meat:2, cheese:1, bacon:1}.
  // Need to convert this to an array here as [salad,meat,meat,cheese,bacon] so that we can use map method below
  // to dynamically render BurgerIngredient

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={} />
    </div>
  );
};
export default burger;
