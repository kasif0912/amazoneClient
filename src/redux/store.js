import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { productReducer } from "./Product/Reducer";

const rootReducers = combineReducers({
  products: productReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
