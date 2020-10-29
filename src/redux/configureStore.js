import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Articles } from "./articlereducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
  const store = createStore(
    // combineReducers is kept so just add in more reducers in the future
    combineReducers({
      articles: Articles,
    }),
    composeEnhancers(applyMiddleware(thunk, logger))
  );

  return store;
};
