import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  // Passing ingredients from here would be appropriate for BurgerIngredient component instead of hardcoding in there.
  // Hence creating state to do the same and pass it to Burger --> BurgerIngredient component

  state = {
    purchasable: false, // this is updated to true if atleast one ingredient is added to the burger. It's updated in updatePurchaseState() called in addIngredientHandler and removeIngredientHandler
    purchasing: false,
    loading: false,
    error: false // Used for ingredients fetching in componentDidMount; if ingredients fail then this will be used to display error message
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
    this.setState({ purchasable: totalIngredients > 0 });
  };

  // When Order Now is clicked, it opens modal and the backdrop (Backdrop has been put inside Modal)
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  // When Backdrop is clicked/Cancel button is clicked (inside OrderSummary), it closes the modal and the backdrop (Backdrop has been put inside Modal)
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  // When Continue button is clicked in the OrderSummary, it closes the modal and the backdrop (Backdrop has been put inside Modal)
  purchaseContinueHandler = () => {
    // Commented code below sends order to backend. We don't need this feature now but later once the checkout form is filled we need it then

    // this.setState({ loading: true });
    // // Sending Order to backend using POST Request of axios
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   // Dummy data fields below for now
    //   customer: {
    //     name: "Sandeep",
    //     country: "India"
    //   }
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false, purchasing: false }); // purchasing is the prop which shows modal, so we set it to false once the purchasing is done to close the modal.
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.setState({ loading: false, purchasing: false }); // purchasing is the prop which shows modal, so we set it to false once the purchasing is done to close the modal.
    //   });

    // Commented code above sends order to backend. We don't need this feature now but later once the checkout form is filled we need it then
    console.log(this.props);

    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?ingredients=" + this.state.ingredients
    // });
    // The above search is not possible because ingredients is not a variable but is an object and can't be passed directly.
    // We need to convert them to string like salad=1&bacon=2 and so on.

    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + this.props.ingredients[i]);
      // encodeURIComponent is provided by javascript which is a helper method that removes whitespace and so on, but is not required in this case
    }
    // This for loop created queryParams = [salad=1,bacon=2,meat=1,cheese=2]
    // We also need price
    queryParams.push("price=" + this.state.totalPrice);
    // Now we have queryParams = [salad=1,bacon=2,meat=1,cheese=2,price=4] --> random values
    // Now we need to join & sign at the end of each ingredient value like salad=1&bacon=2&.... and return a string. This is done by .join on array of queryParams
    const queryString = queryParams.join("&");
    // queryString will be something like salad=1&bacon=2&meat=1&cheese=3&price=4

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });

    // So the url will be like localhost:3000/checkout?salad=1&bacon=2&meat=1&cheese=3&price=4
    // In the checkout component we have to extract this
  };

  // getting ingredients from firebase (previously we had it in local state)
  componentDidMount() {
    console.log("CDM BURGERBUILDER");
    axios
      .get("/ingredients.json")
      .then((response) => this.setState({ ingredients: response.data }))
      .catch((error) => this.setState({ error: true }));
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
    let burger = this.state.error ? ( //If the error is set, which means if ingredients in not loaded by anychance from firebase
      <p>Failed to load ingredients</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      console.log(this.props.ingredients);
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
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
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
