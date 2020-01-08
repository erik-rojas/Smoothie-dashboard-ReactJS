// @flow
/**
 * @module Actions/RequestAccess
 * @desc RequestAccess Actions
 */

import { ActionTypes } from "../constants/index";

function requestLogin(creds) {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function loginError(message) {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function requestLogout() {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

export function receiveLogin(user) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

export function receiveLogout() {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

export function loginUser(creds) {
  // const config = {
  //   method: 'POST',
  //   body: `login=${creds.login}&password=${creds.password}`,
  // };

  // return dispatch => {
  //   dispatch(requestLogin(creds));

  //   return fetch('', config)
  //     .then(response => response.json().then(user => ({ user, response })))
  //     .then(({ user, response }) => {
  //       if (!response.ok) {
  //         dispatch(loginError(user.message));
  //         return Promise.reject(user);
  //       }
  //       // If login was successful, set the token in local storage
  //       localStorage.setItem('id_token', user.id_token);
  //       // Dispatch the success action
  //       dispatch(receiveLogin(user));
  //       return Promise.resolve(user);
  //     })
  //     .catch(err => console.error('Error: ', err));
  // };

  localStorage.setItem("id_token", "token");
  localStorage.setItem("isAuthenticated", JSON.stringify(creds.login));

  return {
    type: ActionTypes.LOGIN_SUCCESS
  };
}

export function logoutUser() {
  localStorage.removeItem("isAuthenticated");
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
  // return dispatch => {
  //   dispatch(requestLogout());
  //   localStorage.removeItem("id_token");
  //   dispatch(receiveLogout());
  // };
}

export function createPassword(password) {
  return {
    type: ActionTypes.PWD_CREATE_SUCCESS
  }
}