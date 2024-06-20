import React from "react";
import ReactDOM from "react-dom/client";
import AppWithRouter from "./App.jsx";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import router from "./App.jsx";
import reducers from "./reducers/index.js";

const store = createStore(reducers, {}, applyMiddleware(thunk));

console.log("Stripe key is: ", import.meta.env.VITE_APP_STRIPE_KEY);
console.log(process.env.NODE_ENV);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppWithRouter />
  </Provider>
);
