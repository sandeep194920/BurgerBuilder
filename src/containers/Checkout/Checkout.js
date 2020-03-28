import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  // This below method is executed when the Checkout is cancelled and should show the BurgerBuilder
  checkoutCancelledHandler = () => {
    // goBack is implemented here because the previous page was BurgerBuilder, and upon cancelling Checkout, it
    // should go back to the BurgerBuilder page
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        {/* Temporary ingredients passing here from this state. It actually will come from BurgerBuilder later */}
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        {/* The below ContactData component is the nested route (Route rendered inside Route and the main Route is checkout) */}

        {/* this.props.match.path gives the existing url + contact-data. If this is not added then the contact-data will not be appended to the current url but will be appended to the checkout since this Route is 
        rendered from within the checkout */}
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
