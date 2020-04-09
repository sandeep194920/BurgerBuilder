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
  // clearing the local storage token due to expiry of expirationTime
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
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
        localStorage.setItem("token", response.data.idToken); // stored in browser local storage as we don't want the token to be lost on page refresh

        // With token, we also need to store the expiration time in the local storage. But the expTime can't be stored directly like we store token.
        // This is because the expTime is just a number which is not that useful. We need to know when the token expires. So the token expires in 60 minutes and
        // the current time of current day is known and then we add this expTime 60 minutes to the current time of current day to know when the token expires.
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
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

// async action - If page refreshes then the localstorage is checked if token exists and is within the expirationTime,
// if yes then authSuccess is dispatched and the user gets automatically logged in again
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout()); // not necessary to dispatch logout here, I could have just done return here as there is no user (no token) to logout, but that is ok
    } else {
      // checking if the current time is within the expirationTime which is in the localStorage. If that is the case then the user should be able to use this token, else this token is outdated and shouldnt be used
      const expirationDate = new Date(localStorage.getItem("expirationDate")); // this is wrapped in the new Date() because the localstorage.getItem() will be a string
      if (expirationDate > new Date()) {
        // new Date() is now
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          ) // the diffrence (in milliseconds, on division by 1000 we get seconds) says how much time the user still has for the token to be valid
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
