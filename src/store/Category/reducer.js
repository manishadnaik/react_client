import * as types from "./actionTypes";
import _ from "lodash";
// Initial states
const initialState = {
  all: [],
  details: {},
};
export default function getApiResponse(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return { ...state, fetching: true, all: action.payload };
    case types.SET_CATEGORY_DETAILS:
      return { ...state, fetching: true, details: action.payload };
    case types.ADD_CATEGORY_TO_LIST:
      return {
        ...state,
        all: [...state.all, { ...action.payload }],
      };
    case types.UPDATE_CATEGORY_TO_LIST:
      let cat = action.payload;
      console.log(cat);
      return {
        ...state,
        all: state.all.map((catObj) =>
          catObj._id === action.payload._id ? { ...cat, catObj } : catObj
        ),
      };
    case types.DELETE_CATEGORY:
      return {
        ...state,
        all: state.all.filter((cat) => cat._id != action.payload),
      };
    case types.UPDATE_CATEGORY_DETAILS:
      let newObj = action.payload;
      return {
        ...state,
        details: newObj,
      };
    case types.POPULATE_REMAINING_AMOUNT:
      return {
        ...state,
        fetching: true,
        remainingAmountFromStore: action.payload,
      };
    case types.REMOVE_SELECTED_CATEGORY:
      return {
        ...state,
        fetching: true,
        details: {},
      };
    default:
      return state;
  }
}
