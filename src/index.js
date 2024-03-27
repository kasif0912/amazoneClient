import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ContextProvider from "./components/context/ContextProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider> 
      <Provider store={store}>
        <App />
      </Provider>
    </ContextProvider>
  </React.StrictMode>
);
