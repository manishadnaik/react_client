import * as types from "./actionTypes";
import _ from "lodash";
// Initial states
const initialState = {
  all: [],
  details: {},
};
export default function getApiResponse(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_EXPENSES:
      return { ...state, fetching: true, all: action.payload };
    // case types.ADD_EXPENSES:
    //   return { ...state, fetching: true, all: action.payload };
    case types.SET_EXPENSE_DETAILS:
      return { ...state, fetching: true, details: action.payload };
    case types.ADD_EXPENSE_TO_LIST:
      return {
        ...state,
        all: [...state.all, { ...action.payload }],
      };
    case types.UPDATE_EXPENSE_TO_LIST:
      let exp = action.payload;
      console.log(exp);
      let a = {
        ...state,
        // all: [...state.all, { ...action.payload }],
        all: state.all.map(
          (
            expObj // console.log(expObj)
          ) => (expObj._id === action.payload._id ? { ...exp, expObj } : expObj)
        ),
      };
      // console.log(a);
      return a;
    case types.DELETE_EXPENSE:
      return {
        ...state,
        all: state.all.filter((exp) => exp._id != action.payload),
      };
    case types.REMOVE_SELECTED_EXPENSES:
      return { ...state, fetching: true, all: action.payload };
    default:
      return state;
  }
}
