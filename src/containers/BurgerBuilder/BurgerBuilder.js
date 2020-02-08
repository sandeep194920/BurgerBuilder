import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  // Passing ingredients from here would be appropriate for BurgerIngredient component instead of hardcoding in there.
  // Hence creating state to do the same and pass it to Burger --> BurgerIngredient component

  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    }
  };

  addIngredientHandler = (ingredient) => {
    const ingredients = { ...this.state.ingredients };
    ingredients[ingredient] = ingredients[ingredient] + 1;
    this.setState({ ingredients: ingredients });
  };

  countIngredients() {
    const ingredients = { ...this.state.ingredients };
    let totalIngredients = 0;
    for (const ingredient in ingredients) {
      totalIngredients += ingredients[ingredient];
    }
    return totalIngredients;
  }

  removeIngredientHandler = (ingredient) => {
    if (this.countIngredients() <= 0) {
      return;
    }
    const ingredients = { ...this.state.ingredients };
    ingredients[ingredient] = ingredients[ingredient] - 1;
    this.setState({ ingredients: ingredients });
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          ingredients={this.state.ingredients} //My way for adding this disabled functionality
        />
      </Aux>
    );
  }
}
export default BurgerBuilder;
