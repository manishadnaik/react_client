import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { SERVER_URL } from "../../config/variables";
import {
  removeSelectedCategory,
  setCategories,
  setCategoryDetails,
  setCategoryUpdatedDetails,
  setRemainingBalance,
} from "../../store/Category";
import {
  removeSelectedExpenses,
  setExpenses,
} from "../../store/Expense/actions";
import CategoryDetailsJsx from "./CategoryDetailsJsx";

const CategoryDetails = (props) => {
  const categoryId = useParams().categoryId;
  let credentials = JSON.parse(localStorage.getItem("credentials"));
  // toggle addExpense btn
  const [showAddExpenseBtn, setShowAddExpenseBtn] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [maximumAmount, setMaximumAmount] = useState(0);
  const [maximumAmountError, setMaximumAmountError] = useState(false);
  var category = useSelector((state) => state.category.details);
  var expenses = useSelector((state) => state.expense).all;
  const dispatch = useDispatch();
  const getCategoryDetails = async () => {
    const response = await axios({
      method: "GET",
      url: SERVER_URL + "/categories/" + categoryId,
      headers: { Authorization: "Bearer " + credentials.token },
      responseType: "json",
    }).catch((err) => console.log(err));
    if (response) {
      dispatch(setCategoryDetails(response.data.category));
      dispatch(setExpenses(response.data.expenses));
      return response.data;
    }
  };
  useEffect(() => {
    getCategoryDetails();

    return () => {
      dispatch(removeSelectedCategory({}));
      dispatch(removeSelectedExpenses({}));
    };
  }, [categoryId]); // useEffect will be called number of times the arg.length

  // when category is loaded update the max amount
  useEffect(() => {
    if (Object.keys(category).length) {
      setMaximumAmount(category.max_amount);
      setRemainingAmount(category.max_amount - totalExpenseAmount);
    }
  }, [category]);
  const setVisibilityOfAddExpenseBtn = (updatedCategory) => {
    // console.log(updatedCategory);
    if (
      updatedCategory.max_amount > 0 &&
      remainingAmount > 0 &&
      updatedCategory.max_amount === +maximumAmount
    ) {
      setShowAddExpenseBtn(true);
    } else {
      setShowAddExpenseBtn(false);
    }
  };
  useEffect(() => {
    // set visibility of expenseBtn
    setVisibilityOfAddExpenseBtn(category);
  }, [remainingAmount]);
  const openNewRowHandler = () => {
    setShowModal(true);
  };
  const closeNewRowHandler = () => {
    setShowModal(false);
  };
  const saveAmountsHandler = (e) => {
    e.preventDefault();
    // call api to update the values
    const savedAmounts = axios({
      method: "PUT",
      url: SERVER_URL + "/categories/" + categoryId,
      headers: { Authorization: "Bearer " + credentials.token },
      data: {
        max_amount: maximumAmount,
      },
    })
      .then((res) => {
        Swal.fire(
          "Updated!",
          "Max amount for this category updated!.",
          "success"
        );
        setRemainingAmount(remainingAmount);
        // dispatch to update the category value
        dispatch(setCategoryUpdatedDetails(res.data.category));
        setVisibilityOfAddExpenseBtn(res.data.category);
        console.log("remainingAmount=>", remainingAmount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const maximumAmountHandler = (e) => {
    let enteredMaxAmtValue = e.target.value;
    let r = enteredMaxAmtValue - totalExpenseAmount;
    setMaximumAmount(enteredMaxAmtValue);
    setRemainingAmount(r);
  };
  useEffect(() => {
    console.log("max amount changed");
    if (maximumAmount) {
      if (maximumAmount > 0 && remainingAmount > 0) {
        setMaximumAmountError(false);
      }
      if (remainingAmount == 0) {
        setMaximumAmountError(false);
      }

      if (maximumAmount <= 0 || maximumAmount < totalExpenseAmount) {
        setMaximumAmountError(true);
      }
    } else {
      setMaximumAmountError(true);
    }
  }, [maximumAmount]);

  const calculateAmounts = (category, expenses) => {
    // console.log("max", category.max_amount);
    // let expenseAmount = 0;
    // for (let exp of Object.values(expenses)) {
    //   expenseAmount += exp.max_amount;
    // }
    // console.log("expenseAmount--", expenseAmount);
    let expenseAmount = expenses.reduce((expenseAmount, expense) => {
      return (expenseAmount += parseInt(expense.max_amount));
    }, 0);

    // console.log("exp", expenseAmount);
    let remainingBalance = category.max_amount - expenseAmount;
    // console.log("bal", remainingBalance);
    let maxAmount = category.max_amount;
    return { maxAmount, expenseAmount, remainingBalance };
  };
  useEffect(() => {
    if (Object.keys(category).length && expenses.length) {
      let { maxAmount, expenseAmount, remainingBalance } = calculateAmounts(
        category,
        expenses
      );
      setTotalExpenseAmount(expenseAmount);
      setRemainingAmount(remainingBalance);
      console.log("remainingBalance=>", remainingBalance);
      dispatch(setRemainingBalance(remainingBalance));
    } else {
      // console.log("here");
      // dispatch(setRemainingBalance(remainingAmount));
    }
    if (expenses.length === 0) {
      setTotalExpenseAmount(0);
      setRemainingAmount(maximumAmount);
      dispatch(setRemainingBalance(maximumAmount));
    }
    console.log("remainingAmount=>", remainingAmount);
  }, [category, expenses]);
  // console.log(category);
  // console.log(expenses);
  return (
    <CategoryDetailsJsx
      params={{
        category,
        showAddExpenseBtn,
        maximumAmount,
        maximumAmountError,
        totalExpenseAmount,
        remainingAmount,
        expenses,
        showModal,
        maximumAmountHandler,
        openNewRowHandler,
        saveAmountsHandler,
        closeNewRowHandler,
      }}
    />
  );
};

export default CategoryDetails;
