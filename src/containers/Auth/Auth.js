import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        // elementConfig will be the DOM props for each elementType.
        // For example for elementType input, <input type="text" placeholder="Name" />, type and placeholder will be elementConfig
        elementConfig: {
          placeholder: "E-Mail Address",
          type: "email"
        },
        value: "", // value is common to any type of inputElement and hence we have it outside of elementConfig. We can have it inside of elementConfig too.
        // in validation we write all the rules we need for this input field.
        validation: {
          required: true,
          isEmail: true // for validation like we the one used in ContactData.js checkValidity().
        },
        valid: false, // valid is used to check if this inputElement (name) is valid or not after validation check. This is then passed as a prop in invalid prop to the Input component
        touched: false
      },

      password: {
        elementType: "input",
        // elementConfig will be the DOM props for each elementType.
        // For example for elementType input, <input type="text" placeholder="Name" />, type and placeholder will be elementConfig
        elementConfig: {
          placeholder: "Password",
          type: "password"
        },
        value: "", // value is common to any type of inputElement and hence we have it outside of elementConfig. We can have it inside of elementConfig too.
        // in validation we write all the rules we need for this input field.
        validation: {
          required: true,
          minLength: 6 // for validation like we the one used in ContactData.js checkValidity(). - 6 minLength is required  by firebase. Other apps can be adjusted as per their backend
        },
        valid: false, // valid is used to check if this inputElement (name) is valid or not after validation check. This is then passed as a prop in invalid prop to the Input component
        touched: false
      }
    }
  };

  checkValidity(value, rules) {
    // This is required if rules is undefined for a particular type of inputElement. In this case we have deliveryMethod for which we dont have any validation.
    if (!rules) {
      return true;
    }
    // if this method returns true then the field on the form is valid else not
    let isValid = false;

    // All the rules in the validation object (for inputElement) is validated here and returned as true or false
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength; // Zipcode has a minLenth rule here so this would be applied for that
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid; // Zipcode has a maxLenth rule here so this would be applied for that
    }
    // The bug of minLength and maxLength has now been fixed by adding && isValid. You are also considering the minLength
    // result for maxLength validation so that both has to be true for the result to be true. That solves the problem.

    // The other ways is by turining isValid initially defined to true and including that in every check. Max does take
    // this approach but I am leaving mine here for now. We can come back to this if my rule doesn't work as expected.

    // console.log(isValid);

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    // Similar to the one in ContactData
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id} // name, street, country, email, zipcode . These are passed into the inputChangedHandler
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        defaultValue={formElement.config.value} //value can be defaultValue which avoids the warning in DOM
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched} // Used to track if the inputElement was touched - to show the error if value not entered as per validation rule
        shouldValidate={formElement.config.validation}
      />
    ));
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Auth);
