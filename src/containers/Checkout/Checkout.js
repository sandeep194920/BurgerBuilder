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

  // This is executed when the Checkout is cancelled and should show the BurgerBuilder
  checkoutCancelledHandler = () => {
    // goBack is implemented here because the previous page was BurgerBuilder, and upon cancelling Checkout, it
    // should go back to the BurgerBuilder page
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    // not yet implemented contact-date. This comment will be removed once implemented.
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        {/* Temporary ingredients passing here from this state. It actually will come from BurgerBuilder later */}
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}
export default Checkout;
