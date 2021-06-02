import * as types from "./actionTypes";

export const setExpenses = (expenses) => {
  return {
    type: types.SET_EXPENSES,
    payload: expenses,
  };
};

export const setExpenseDetails = (expense) => {
  return {
    type: types.SET_EXPENSE_DETAILS,
    payload: expense,
  };
};
export const removeSelectedExpenses = (payload) => {
  return {
    type: types.REMOVE_SELECTED_EXPENSES,
    payload: payload,
  };
};
