import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        id: action.orderID,
        ...action.orderData
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({ newOrder })
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};
export default reducer;
