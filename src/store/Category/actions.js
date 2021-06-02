import * as types from "./actionTypes";

export const setCategories = (categories) => {
  return {
    type: types.SET_CATEGORIES,
    payload: categories,
  };
};

export const setCategoryDetails = (category) => {
  return {
    type: types.SET_CATEGORY_DETAILS,
    payload: category,
  };
};
export const addCategoryToList = (category) => {
  return {
    type: types.ADD_CATEGORY_TO_LIST,
    payload: category,
  };
};
export const deleteCategory = (categoryId) => {
  return {
    type: types.DELETE_CATEGORY,
    payload: categoryId,
  };
};
export const removeSelectedCategory = (payload) => {
  return {
    type: types.REMOVE_SELECTED_CATEGORY,
    payload: payload,
  };
};

export const setCategoryUpdatedDetails = (category) => {
  return {
    type: types.UPDATE_CATEGORY_DETAILS,
    payload: category,
  };
};
export const setRemainingBalance = (amount) => {
  return {
    type: types.POPULATE_REMAINING_AMOUNT,
    payload: amount,
  };
};
