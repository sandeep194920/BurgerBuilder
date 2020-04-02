import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../store/utility";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

      return updateObject(state, updatedState);

    case actionTypes.REMOVE_INGREDIENT:
      const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      };
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };

      return updateObject(state, updatedSt);

    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          meat: action.ingredients.meat,
          cheese: action.ingredients.cheese
        },
        error: false, // this is important bcoz if we had error before then this clears it out
        totalPrice: 4 // this helps when redirecting to homepage after redirection after first order is been placed
      });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
};
export default reducer;
