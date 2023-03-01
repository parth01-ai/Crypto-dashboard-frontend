import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import searchReducer from "./searchReducer";

// The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore
const reducers = combineReducers({
  currency: currencyReducer,
  search: searchReducer,
});

export default reducers;
