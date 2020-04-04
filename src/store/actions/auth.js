import * as actionTypes from "./actionTypes";

// sync action : Essentially used to show the auth action has started hence the loading can be set to true in store to show spinner
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

// sync action sent to reducer
export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

// sync action sent to reducer
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

// aysnc action : to get from backend. This info got from async action below will be sent to reducer through sync actions above
export const auth = (email, password) => {
  return (dispatch) => {
    console.log("Reached auth");
    dispatch(authStart()); // All this dispactches can be seen in redux devtools in chrome browser to see if this works
  };
};
