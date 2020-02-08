import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

// Creating global constant for Ingredient prices
const INGREDIENT_PRICES = {
  salad: 0.5,
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
    totalPrice: 4, // default price without any ingredients
    purchasable: false // this is updated to true if atleast one ingredient is added to the burger. It's updated in updatePurchaseState() called in addIngredientHandler and removeIngredientHandler
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

  updatePurchaseState = (ingredients) => {
    // If we don't get the ingredients here as an argument and use {...this.state.ingredients}, as I did earlier, then we were getting the ingredients state
    // which was not upto date. Even in the video (166. Adding the Order Button), you can see the same.
    let totalIngredients = 0;
    for (const ingredient in ingredients) {
      totalIngredients += ingredients[ingredient];
    }
    // if (totalIngredients > 0) {
    //   this.setState({ updatePurchasable: true });
    // } else {
    //   this.setState({ updatePurchasable: false });
    // }

    // The above if loop can be simply written as
    this.setState({ purchasable: totalIngredients > 0 });
  };

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
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHanlder = (type) => {
    // process of updating ingredients
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      // In my way, I made use of countIngredients method (commented above) which I feel unnecessary. This if statement would do
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    // process of updating price
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    // Max's way of adding disabled ingredient button functionality
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // This check produces true/false for each ingredient like {salad: true,meat:false...}
    }
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

        <BuildControls
          ingredientAdded={this.addIngredientHanlder}
          ingredientRemoved={this.removeIngredientHanlder}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}
export default BurgerBuilder;
