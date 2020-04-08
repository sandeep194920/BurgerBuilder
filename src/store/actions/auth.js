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
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

// sync action sent to reducer
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

// sync - logout action
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// async action (async because we are using setTimeout) - used to check if the token in still valid or not due to the timeout. We will dispatch this after getting the success response
// in auth below right after dispatching authSuccess()
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000); // expiration time we get from backend is in milliseconds. To convert into seconds we multiply by 1000
  };
};

// aysnc action : to get from backend. This info got from async action below will be sent to reducer through sync actions above
export const auth = (email, password, isSignup) => {
  //if signup then we send to one url, if signin then different url. To know that we use isSignup here which is passed by Auth.js component
  return (dispatch) => {
    dispatch(authStart()); // All this dispactches can be seen in redux devtools in chrome browser to see if this works
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true, // You need to have this info as per the docs of firebase which we need to pass to firebase to get the token during signup. You can find it at https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    };
    // for signup
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvhN5t3lHIQ9f67EP5Jpu_Yu2dXTTIQww";

    // this if loop is for signin
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvhN5t3lHIQ9f67EP5Jpu_Yu2dXTTIQww";
    }
    axios
      .post(url, authData)
      .then((response) => {
        // here in response.data which is dipatched below, we get the token. This is dispatched in authSuccess() below and stored in reducer
        console.log(response); // 1  - addressed below in dispatch(checkAuthTimeout(response.data.expiresIn)) line.
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn)); // you can see this by logging in. The console log above commented as 1 gives you the data which contains this expiresIn attribute for your reference
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

// sync action - to update authRedirectPath in the auth reducer on differnt auth conditions
export const setAuthRedirect = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path,
  };
};
