import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

// Creating global constant for Ingredient prices
const INGREDIENT_PRICES = {
  sald: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // Passing ingredients from here would be appropriate for BurgerIngredient component instead of hardcoding in there.
  // Hence creating state to do the same and pass it to Burger --> BurgerIngredient component

  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 4 // default price without any ingredients
  };

  // MY WAY COMMENTED BELOW

  // addIngredientHandler = (ingredient) => {
  //   const ingredients = { ...this.state.ingredients };
  //   ingredients[ingredient] = ingredients[ingredient] + 1;
  //   this.setState({ ingredients: ingredients });
  // };

  // countIngredients() {
  //   const ingredients = { ...this.state.ingredients };
  //   let totalIngredients = 0;
  //   for (const ingredient in ingredients) {
  //     totalIngredients += ingredients[ingredient];
  //   }
  //   return totalIngredients;
  // }

  // removeIngredientHandler = (ingredient) => {
  //   if (this.countIngredients() <= 0) {
  //     return;
  //   }
  //   const ingredients = { ...this.state.ingredients };
  //   ingredients[ingredient] = ingredients[ingredient] - 1;
  //   this.setState({ ingredients: ingredients });
  // };

  // MY WAY COMMENTED ABOVE

  addIngredientHanlder = (type) => {
    // process of updating ingredients
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    // process of updating price
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };
  removeIngredientHanlder = (type) => {};

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        {/* MY WAY OF BELOW */}
        {/* <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          ingredients={this.state.ingredients} //My way for adding this disabled functionality
        /> */}
        {/* MY WAY ABOVE */}

        <BuildControls ingredientAdded={this.addIngredientHanlder} />
      </Aux>
    );
  }
}
export default BurgerBuilder;
