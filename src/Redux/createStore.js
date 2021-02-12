import { createStore, applyMiddleware } from "redux";
import { Auth } from "./user";
import logger from "redux-logger";

export const create = () => {
  return createStore(Auth, applyMiddleware(logger));
};
