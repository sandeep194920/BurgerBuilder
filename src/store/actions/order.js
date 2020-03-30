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
  // we might get error in the purchaseBurger if we are not able to place the order to backend
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

// below action creators used for fetching orders from backend

// sync action - fetchOrderStart is used to set loading to true initially before the orders are fetched completely. This is used in fetchOrder
export const fetcheOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};
// sync action - dispatched to reducer and puts the order in to order.js store
export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};
// sync action - dispatched to reducer
export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetcheOrderStart());
    axios
      .get("/orders.json")
      .then(
        // The response.data we get back is objects and we need to convert that to an array to get orders so that we can map on it.
        (response) => {
          const orders = [];
          for (const key in response.data) {
            // key will be a unique number and that holds an order object ---> {customer : ... , ingreds: ... , price : ...}
            // orders.push(response.data[key]);    // I can do this but the problem is we don't get the unique identifier that can be used later in the map function as key. So I will retain the key as well
            orders.push({
              id: key,
              ...response.data[key]
            });
          }
          // this.setState({ orders: orders, loading: false }); // This was used in CDM of Order.js to fetch the orders from backend before redux
          dispatch(fetchOrderSuccess(orders)); // no need to pass/dispatch loading as done above (commented) in setState because we directly set this in reducer for this action
        }
      )
      // .catch((err) => this.setState({ loading: false })); // This was used in CDM of Order.js before redux
      .catch((err) => dispatch(fetchOrderFail(err)));
  };
};
