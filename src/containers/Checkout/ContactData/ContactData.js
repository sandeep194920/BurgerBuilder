import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

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
          type: "text",
        },
        value: "", // value is common to any type of inputElement and hence we have it outside of elementConfig. We can have it inside of elementConfig too.
        // in validation we write all the rules we need for this input field.
        validation: {
          required: true,
        },
        valid: false, // valid is used to check if this inputElement (name) is valid or not after validation check. This is then passed as a prop in invalid prop to the Input component
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          placeholder: "Your Street",
          type: "text",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false, // valid is used to check if this inputElement (name) is valid or not after validation check. This is then passed as a prop in invalid prop to the Input component
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          placeholder: "ZipCode",
          type: "text",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false, // valid is used to check if this inputElement (name) is valid or not after validation check. This is then passed as a prop in invalid prop to the Input component
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          placeholder: "Country",
          type: "text",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false, // valid is used to check if this inputElement (name) is valid or not after validation check. This is then passed as a prop in invalid prop to the Input component
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "Email",
          type: "email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false, // valid is used to check if this inputElement (name) is valid or not after validation check. This is then passed as a prop in invalid prop to the Input component
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        valid: true, // valid is used to check if this inputElement (name) is valid or not after validation check. This is then passed as a prop in invalid prop to the Input component
        value: "fastest", // this should be the default value
      },
    },
    formIsValid: false, // this helps to check if the overall form is valid so that we can continue futher
  };

  orderHandler = (event) => {
    event.preventDefault(); // Since we use this inside a form, it treats the button below which calls this as submit and thus reloads the page which we don't need. Hence implementing this method here.

    // We now get the ingredient props here from Checkout by passing prop inside Route with the help of render inside checkout component.
    // We place the code below responsible for sending order to the backend. We can use the code we initally used in the purchaseContinueHandler
    // in the BurgerBuilder.

    // this.setState({ loading: true }); // in redux, this should be dispatched in order.js in action
    // passing orderform data
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    // Sending Order to backend using POST Request of axios
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId, // Because of this we can fetch the orders related to specific user

      // customer data now comes from state
    };

    // Below commented block was used before redux async was introduced. Now this logic is used in actions/order.js

    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false }); // we removed purchasing:false here since we no longer need that which was initially necessary to show and hide modal. However, loading can be used to show Spinner as before during ordering
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.setState({ loading: false }); // we removed purchasing:false here since we no longer need that which was initially necessary to show and hide modal. However, loading can be used to show Spinner as before during ordering
    //   });
    // console.log(this.props);
    // this.props.history.replace("/");  // after redux, this is not used anymore

    // Above commented block was used before redux async was introduced. Now this logic is used in actions/order.js

    this.props.onOrderBurger(order, this.props.token);
  };

  // checkValidity has been outsourced to utility function

  // checkValidity(value, rules) {
  //   // This is required if rules is undefined for a particular type of inputElement. In this case we have deliveryMethod for which we dont have any validation.
  //   if (!rules) {
  //     return true;
  //   }
  //   // if this method returns true then the field on the form is valid else not
  //   let isValid = false;

  //   // All the rules in the validation object (for inputElement) is validated here and returned as true or false
  //   if (rules.required) {
  //     isValid = value.trim() !== "";
  //   }
  //   if (rules.minLength) {
  //     isValid = value.length >= rules.minLength; // Zipcode has a minLenth rule here so this would be applied for that
  //   }

  //   if (rules.maxLength) {
  //     isValid = value.length <= rules.maxLength && isValid; // Zipcode has a maxLenth rule here so this would be applied for that
  //   }
  //   // The bug of minLength and maxLength has now been fixed by adding && isValid. You are also considering the minLength
  //   // result for maxLength validation so that both has to be true for the result to be true. That solves the problem.

  //   // The other ways is by turining isValid initially defined to true and including that in every check. Max does take
  //   // this approach but I am leaving mine here for now. We can come back to this if my rule doesn't work as expected.

  //   // console.log(isValid);

  //   return isValid;
  // }

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    // For two way binding (when the value is entered, the state needs to be updated instantly), we set the value in the state for each field
    // For this reason, the event alone wont help as we need to know which element needs to be updated, hence we get inputIdentifier as parameter
    // inputIdentifier can be the keys in the orderForm like name, street and so on.

    // Now I need to change the value of the inputIdentifier in the state. This has to be done immutably. For this I can use json.Stringify or using spread operator of all layers like below
    // name, street, country, email, zipcode . These are passed in as inputIdentifier and our aim is to set to value attribute

    // Initially used before UpdateObject - The below commented code below can be updated using updateObject utility function
    // const updatedOrderForm = {
    //   ...this.state.orderForm, // This is the shallow copy of orderForm
    // };

    // Initially used before UpdateObject - The below commented code below can be updated using updateObject utility function

    // const updatedFormElement = {
    //   ...updatedOrderForm[inputIdentifier], // This gives object of each key like orderForm[input], orderForm[country] and so on
    // };

    //  Initially used before UpdateObject - The above commented code below can be updated using updateObject utility function

    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
      }
    );

    // Initially used before UpdateObject - Now used above where we pass everything to updateObject second argument

    // In updatedForm I need to now update the value. This is done immuatbly
    //updatedFormElement.value = event.target.value; // updatedFormElement may be name, email and so on

    // As soon as this is touched (user places cursor on this inputElement), the touched property of state (if exisits for this input) should become true.
    // This helps to display error only on this inputElement if user enters unexpected input (violates the validation rules)
    //updatedFormElement.touched = true;

    // Initially used before UpdateObject - Now used above where we pass everything to updateObject second argument

    // updatedFormElement.valid = this.checkValidity(
    //   updatedFormElement.value,
    //   updatedFormElement.validation
    // );
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    // updatedOrderForm[inputIdentifier] = updatedFormElement;

    // Checking overall form validity. For this, I have added isFormValid property to state and initially set to false
    let formIsValid = true; // let this be true initially and this changes on every iteration below because the this.state.orderForm[inputElement].valid below could be false.
    for (let inputElement in this.state.orderForm) {
      formIsValid = formIsValid && this.state.orderForm[inputElement].valid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    // we need to get the orderForm into an array so that we can apply map on that and extract jsx for each <Input/>
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
      // console.log(formElementsArray);
    }

    let form = (
      <form>
        {/* Each element below is in the form of - <Input elementType="..." elementConfig="..." value="..." /> */}
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id} // name, street, country, email, zipcode . These are passed into the inputChangedHandler
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            defaultValue={formElement.config.value} //value can be defaultValue which avoids the warning in DOM
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched} // Used to track if the inputElement was touched - to show the error if value not entered as per validation rule
            shouldValidate={formElement.config.validation} // This exists because - In the Input component, we can use invalid prop (if condition) to see if the validation is success or not. But what if we dont need to validate a filed like drop-down, then this comes handy. So in the Input comp, we see if this is set to true then only we validate, else no. If we dont have this, then even drop-down looks red which means its not validated which is meaningless.
            // changed={this.inputChangedHandler} // Just this if no parameter is passed.
          />
        ))}

        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId, // Because of this we can fetch the orders related to specific user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(withRouter(ContactData), axios));
