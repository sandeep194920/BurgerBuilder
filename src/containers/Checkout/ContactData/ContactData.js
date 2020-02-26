import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault(); // Since we use this inside a form, it treats the button below which calls this as submit and thus reloads the page which we don't need. Hence implementing this method here.
    console.log(this.props);

    // We now get the ingredient props here from Checkout by passing prop inside Route with the help of render inside checkout component.
    // We place the code below responsible for sending order to the backend. We can use the code we initally used in the purchaseContinueHandler
    // in the BurgerBuilder.

    this.setState({ loading: true });
    // Sending Order to backend using POST Request of axios
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      // Dummy data fields below for now
      customer: {
        name: "Sandeep",
        country: "India"
      }
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false }); // we removed purchasing:false here since we no longer need that which was initially necessary to show and hide modal. However, loading can be used to show Spinner as before during ordering
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false }); // we removed purchasing:false here since we no longer need that which was initially necessary to show and hide modal. However, loading can be used to show Spinner as before during ordering
      });
    console.log(this.props);
    this.props.history.replace("/");
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default withRouter(ContactData);
