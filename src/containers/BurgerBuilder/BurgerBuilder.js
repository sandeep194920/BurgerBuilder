import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

// import {
//   addIngredient,
//   removeIngredient
// } from "../../store/actions/burgerBuilder";

class BurgerBuilder extends Component {
  // Passing ingredients from here would be appropriate for BurgerIngredient component instead of hardcoding in there.
  // Hence creating state to do the same and pass it to Burger --> BurgerIngredient component

  state = {
    purchasing: false,
    // loading: false, // this is not used anymore because the logic which was in cdm to get the ingredients from backend has been moved to the action creator - burgerBuilder.js
    // error: false // Used for ingredients fetching in componentDidMount; if ingredients fail then this will be used to display error message
    // This error is now fetched from reducer -burgerBuilder.js
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

    // My way of getting totalIngredients below - using for in loop

    // let totalIngredients = 0;
    // for (const ingredient in ingredients) {
    //   totalIngredients += ingredients[ingredient];
    // }

    // Max's way of getting totalIngredients below - using map and reduce.
    // Note : Object.keys(ingredients) converts ingredients obj to array having keys --> ['salad','cheese'..]
    // .map(ing) gives single ingredient like salad and ingredients[ingredient] gives value. Once map
    // returns the totalIngredients then the reduce is called. reduce takes sum as 0 (value after ,)
    // and then adds 1 to each iteration of totalIngredient starting from 0 (value after ,)

    const totalIngredients = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((sum, el) => sum + el, 0);

    // This can also be written as below without a return statement

    // const totalIngredients = Object.keys(ingredients)
    //   .map((ingredient) => ingredients[ingredient])
    //   .reduce((sum, el) => sum + el, 0);

    // if (totalIngredients > 0) {
    //   this.setState({ updatePurchasable: true });
    // } else {
    //   this.setState({ updatePurchasable: false });
    // }

    // The above if loop can be simply written as
    // this.setState({ purchasable: totalIngredients > 0 }); // This was used when state property purchasable was used. Now redux is used hence this is not used to set state but directly returned in next line.
    return totalIngredients > 0;
  };

  // When Order Now is clicked, it opens modal and the backdrop (Backdrop has been put inside Modal)
  // When SIGNUP TO ORDER button is clicked, it redirects to the Auth.js page, hence we use if loop inside purchaseHandler
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth"); // this takes us to auth page when clicked on SIGNUP TO ORDER btn (user is not authenticated here)
    }
  };

  // When Backdrop is clicked/Cancel button is clicked (inside OrderSummary), it closes the modal and the backdrop (Backdrop has been put inside Modal)
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  // When Continue button is clicked in the OrderSummary, it closes the modal and the backdrop (Backdrop has been put inside Modal)
  purchaseContinueHandler = () => {
    // No need of queryparams after introducing redux, hence commenting below part

    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  // getting ingredients from firebase (previously we had it in local state)
  componentDidMount() {
    // console.log("CDM BURGERBUILDER");
    // axios
    //   .get("/ingredients.json")
    //   .then((response) => this.setState({ ingredients: response.data }))
    //   .catch((error) => this.setState({ error: true }));

    // The above commented code has been moved to action creator - burgerBuilder.js
    this.props.onInitIngredients(); // this calls the action creator - burgerBuilder.js to initialize ingredients
  }

  render() {
    // Max's way of adding disabled ingredient button functionality
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // This check produces true/false for each ingredient like {salad: true,meat:false...}
    }

    // The if loop below is added because we have set the ingredients to null here and fetching it from firebase.
    // Before we fetch them, the child components that depend on the ingredients will fail. Hence we show
    // spinner till the components will be available

    // Three such components that has ingredients passed into it is Buger, BuildControls and OrderSummary.
    // So we conditionally render them. (Note that OrderSummary was enclosed with other if else loop above,
    // but now is included here)
    let orderSummary = null;
    let burger = this.props.error ? ( //If the error is set, which means if ingredients in not loaded by anychance from firebase
      <p>Failed to load ingredients</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)} //Ne need of argument here as this ingredients can be directly used in updatePurchaseState() method
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated} // used in the BuildControls to ORDER NOW if logged in and Signup now if not authenticated
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
