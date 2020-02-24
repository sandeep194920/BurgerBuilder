import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {}
  };

  // We get the ingredients from the queryParams built inside the purchaseContinueHandler (continue button on OrderSummary)
  // and use those ingredients here in CDM to build the same burger for checkout
  // These queryParams which is passed in purchaseContinueHandler in BurgerBuilder will be available in location props
  componentDidMount() {
    // By implementing CDM, we can get rid of state in this component which was used only to build dummy components

    // search prop will have  search: "?ingredients=bacon=1&cheese=0&meat=0&salad=0".
    // To extact this we use URLSearchParams(this.props.location.search)

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    // console.log(query.entries()); // Each entry of query.entries will have like this ['salad','1']
    for (let param of query.entries()) {
      // console.log(param[0]); // This will have salad bacon and so on; just the key names
      // console.log(param[1]); // This will have the value
      ingredients[param[0]] = +param[1]; // '+' converts the value from string to number
      // Now we have new ingredients
      this.setState({ ingredients: ingredients });
    }
  }

  // This below method is executed when the Checkout is cancelled and should show the BurgerBuilder
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
