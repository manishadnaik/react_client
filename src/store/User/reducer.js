import * as types from "./actionTypes";
import _ from "lodash";
// Initial states
const initialState = {
  user: [],
};
export default function getApiResponse(state = initialState, action = {}) {
  switch (action.type) {
    case types.STORE_USER:
      return { ...state, fetching: true, user: action.payload };
    // case types.GET_USER:
    //   return { ...state, fetching: true, user: action.payload };
    case types.REMOVE_USER:
      debugger;
      return { ...state, user: null };
    default:
      return state;
  }
}
