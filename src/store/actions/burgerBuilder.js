import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};

// fetching ingredients from backend using thunk

// helper for ingredients fetch (sync) helper
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

// fetch ingredients failed (sync) helper
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

// actual aync action creator to get ingredients
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => dispatch(setIngredients(response.data)))
      .catch((error) => dispatch(fetchIngredientsFailed()));
  };
};
