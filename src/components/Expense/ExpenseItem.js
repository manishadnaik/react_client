import React, { useState } from "react";
import { SERVER_URL } from "../../config/variables";
import Swal from "sweetalert2";
import { DELETE_EXPENSE } from "../../store/Expense/actionTypes";
import { useDispatch } from "react-redux";
import axios from "axios";
import AddRow from "../Shared/AddRow";
import Modal from "../Shared/Modal";
import ExpenseItemJsx from "./ExpenseItemJsx";

const ExpenseItem = ({ index, expense, category }) => {
  let credentials = JSON.parse(localStorage.getItem("credentials"));
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const closeNewRowHandler = () => {
    setShowModal(false);
  };
  const onDeleteHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    var expenseId = e.target.id;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // axios call to delete this
        deleteExpense(expenseId).then(() => {
          dispatch({ type: DELETE_EXPENSE, payload: expenseId });
        });
      }
    });
  };
  const deleteExpense = async (expenseId) => {
    console.log(expenseId);
    if (expenseId) {
      const url = SERVER_URL + "/expenses/" + expenseId;
      console.log(url);
      const response = await axios({
        method: "DELETE",
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.token,
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  };
  const onEditHandler = async (expenseId) => {
    setShowModal(true);
  };
  const headerText = "Expense Details";
  const [imageModal, setImageModal] = useState(false);

  const closeImageModalHandler = () => {
    setImageModal(false);
  };
  const showImageModalHandler = () => {
    setImageModal(true);
  };
  return (
    <ExpenseItemJsx
      params={{
        index,
        expense,
        showModal,
        imageModal,
        headerText,
        showImageModalHandler,
        closeImageModalHandler,
        onEditHandler,
        onDeleteHandler,
        closeNewRowHandler,
      }}
    />
  );
};

export default ExpenseItem;
