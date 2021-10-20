import { applyMiddleware, createStore, compose } from "redux";
import reducers from "../src/reducers";
import reduxThunk from "redux-thunk";

export const findByTestAttr = (component, attr) => {
  return component.find(`[data-test='${attr}']`);
};

export const testStore = (initialState) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(reduxThunk))
  );
};
