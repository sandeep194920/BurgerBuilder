import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../store/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

// utility function to reduce number of lines in PURCHASE_INIT case
const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};
// utility function to reduce number of lines in PURCHASE_BURGER_START case
const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: false });
};
// utility function to reduce number of lines in PURCHASE_BURGER_SUCCESS case
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {
    id: action.orderID
  });

  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat({ newOrder })
  });
};
// utility function to reduce number of lines in PURCHASE_BURGER_FAIL case
const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};
// utility function to reduce number of lines in FETCH_ORDERS_START case
const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};
// utility function to reduce number of lines in FETCH_ORDERS_SUCCESS case
const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: action.orders
  });
};
// utility function to reduce number of lines in FETCH_ORDERS_FAIL case
const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    // cases for getting orders from backend
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};
export default reducer;
