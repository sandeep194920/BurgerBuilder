import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  // Temporary state created to hold temporary ingredients. This ingredients object need to come from BurgerBuilder
  // but for now we write it here to pass it to CheckoutSummary. We will modify this later
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 2,
      bacon: 3
    }
  };
  render() {
    return (
      <div>
        {/* Temporary ingredients passing here from this state. It actually will come from BurgerBuilder later */}
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}
export default Checkout;
