import * as actionTypes from "./actionTypes";
// Not using axios-orders instance but using default axios
import axios from "axios";

// sync action : Essentially used to show the auth action has started hence the loading can be set to true in store to show spinner
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

// sync action sent to reducer
export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

// sync action sent to reducer
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

// aysnc action : to get from backend. This info got from async action below will be sent to reducer through sync actions above
export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart()); // All this dispactches can be seen in redux devtools in chrome browser to see if this works
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true, // You need to have this info as per the docs of firebase which we need to pass to firebase to get the token during signup. You can find it at https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvhN5t3lHIQ9f67EP5Jpu_Yu2dXTTIQww",
        authData
      )
      .then((response) => {
        // here in response.data which is dipatched below, we get the token. This is dispatched in authSuccess() below and stored in reducer
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};
