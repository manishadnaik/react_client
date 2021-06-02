import { combineReducers } from "redux";
import category from "./Category";
import expense from "./Expense";
// Combine all reducers
export default combineReducers({
  category,
  expense,
});
