import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// sync action - which is dispatched to reducer
export const purchaseBurgerSuccess = (id, orderData) => {
  // we get the id and data of order placed from backend
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderID: id,
    orderData: orderData
  };
};

// sync action - which is dispatched to reducer
export const purchaseBurgerFail = (error) => {
  // we might get error in the purchaseBurgerStart if we are not able to place the order to backend
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

// sync action - in our orderHandler() we had setState({loading:true}) when and during this the order was placed to backend.
// Hence, this needs to be dispatched during purchaseBurger async action below similar to functionality used to be in orderHandler() in ContactData.
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START //this is dispatched in purchaseBurger below
  };
};

// async action which puts our order into backend
export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart()); // this is dispatched to set loading to true in reducer - order.js
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        //this.setState({ loading: false }); // This was used in ContactData orderHandler()
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        // this.setState({ loading: false });
        dispatch(purchaseBurgerFail(error));
      });
  };
};

// sync action - This is used to redirect to homepage localhost:3000/ in checkout page
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};
