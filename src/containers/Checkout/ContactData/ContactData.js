import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      // each key here represents one inputElement
      name: {
        elementType: "input",
        // elementConfig will be the DOM props for each elementType.
        // For example for elementType input, <input type="text" placeholder="Name" />, type and placeholder will be elementConfig
        elementConfig: {
          placeholder: "Your Name",
          type: "text"
        },
        value: "" // value is common to any type of inputElement and hence we have it outside of elementConfig. We can have it inside of elementConfig too.
      },
      street: {
        elementType: "input",
        elementConfig: {
          placeholder: "Your Street",
          type: "text"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          placeholder: "ZipCode",
          type: "text"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          placeholder: "Country",
          type: "text"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "Email",
          type: "email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
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
      price: this.props.price
      // customer data now comes from state
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
    // we need to get the orderForm into an array so that we can apply map on that and extract jsx for each <Input/>
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
      // console.log(formElementsArray);
    }

    let form = (
      <form>
        {/* We used to have normal input buttons here till now. Now am commenting them and use the Input created in UI which is generic one for any input type (even though we have only input and textarea there for now) */}

        {/* <input
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
        /> */}

        {/* The above commented code was used for input before */}

        {/* The below commented part is the one used before setting up the state */}

        {/* <Input
          type="text"
          name="name"
          placeholder="Your Name"
          inputtype="input"
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          inputtype="input"
        />
        <Input
          type="text"
          name="street"
          placeholder="Street"
          inputtype="input"
        />
        <Input
          type="text"
          name="postal"
          placeholder="Postal Code"
          inputtype="input"
        /> */}

        {/* The above commented part is the one used before setting up the state */}

        {/* The below one is the one using state elements.*/}
        {/* Each element below is in the form of - <Input elementType="..." elementConfig="..." value="..." /> */}
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            defaultValue={formElement.config.value} //value can be defaultValue which avoids the warning in DOM
          />
        ))}

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
