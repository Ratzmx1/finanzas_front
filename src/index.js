import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter as RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { create } from "./Redux/createStore";

const store = create();

ReactDOM.render(
  <StrictMode>
    <RouterProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </RouterProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
