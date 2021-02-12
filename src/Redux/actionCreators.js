import { SET_TOKEN, SET_USER } from "./actionTypes";

export const setToken = (token) => {
  localStorage.setItem("token", token);
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  return {
    type: SET_USER,
    payload: user,
  };
};
