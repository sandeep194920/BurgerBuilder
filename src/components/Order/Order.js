import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  // props.ingredients is an object so we have to convert it to array to map it and display

  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ingredient) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={ingredient.name}
      >
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients : {ingredientOutput}</p>
      <p>
        Price : <strong>USD {props.price.toFixed(2)}</strong>
        {/* Price : <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong> */}
        {/* Use Number.parseFloat format to convert if you are passing a string prop for price. Here am not using this 
        because I am passing number format directly by adding + in Orders.js to the price */}
      </p>
    </div>
  );
};
export default order;
