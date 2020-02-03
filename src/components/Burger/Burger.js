import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "../Burger/Burger.module.css";

const burger = (props) => {
  // We now get ingredients prop which is an object {salad : 1, meat:2, cheese:1, bacon:1}.
  // Need to convert this to an array here as [salad,meat,meat,cheese,bacon] so that we can use map method below
  // to dynamically render BurgerIngredient

  // Two methods shown here to achieve above task

  // 1. My method --Starts
  const ingredientArrayKeys = Object.keys(props.ingredients); // First we get the keys, so ingredientArrayKeys = ['salad','meat','cheese','bacon']  // console.log(ingredientArrayKeys);
  const myIngredientsArray = ingredientArrayKeys.map((ing) => {
    const tempArr = [...Array(props.ingredients[ing])].map((a) => ing); // Note that instead of [...Array()], the new Array() doesnt work.
    return tempArr;
  });
  const transformedIngredients = myIngredientsArray.flat(); // In video 160, instead of using .flat() like this, he uses reduce function. Go through that as well if you want.
  let burgerIngredients = <p>Please start adding ingredients!</p>;

  if (transformedIngredients.length > 0) {
    burgerIngredients = transformedIngredients.map((ingredient, index) => (
      <BurgerIngredient key={index} type={ingredient} />
    ));
  }

  // 2. For Max's method refer video 159. (Outputting Burger Ingredients Dynamically)
  // In his video he shows something similar but I have split the functionality little bit and made it easy to understand

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {burgerIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default burger;
