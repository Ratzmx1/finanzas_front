import { SET_TOKEN, SET_USER } from "./actionTypes";

const initialState = { token: "", user: {} };

export const Auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOKEN:
      return { ...state, token: payload };
    case SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};
