import { combineReducers } from "redux";
import plates from "./plateReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  plates,
  apiCallsInProgress
});

export default rootReducer;
