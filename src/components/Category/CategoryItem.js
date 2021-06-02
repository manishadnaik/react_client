import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { SERVER_URL } from "../../config/variables";
import { deleteCategory } from "../../store/Category";
import { DELETE_CATEGORY } from "../../store/Category/actionTypes";
import AddRow from "../Shared/AddRow";
import Modal from "../Shared/Modal";
import "./CategoryItem.css";
import CategoryItemJsx from "./CategoryItemJsx";

const CategoryItem = ({ item }) => {
  let credentials = JSON.parse(localStorage.getItem("credentials"));
  const dispatch = useDispatch();
  const onDeleteHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    var categoryId = e.target.id;
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
        deleteCategoryApi(categoryId).then(() => {
          // Swal.fire("Deleted!", "Your file has been deleted.", "success");
          // dispatch({ type: DELETE_CATEGORY, payload: categoryId });
          dispatch(deleteCategory(categoryId));
        });
      }
    });
  };
  const deleteCategoryApi = async (categoryId) => {
    console.log(categoryId);
    if (categoryId) {
      const url = SERVER_URL + "/categories/" + categoryId;
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

  const headerText = "Category Image";
  const [imageModal, setImageModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const closeNewRowHandler = () => {
    setShowModal(false);
  };
  const closeImageModalHandler = () => {
    setImageModal(false);
  };
  const showImageModalHandler = () => {
    setImageModal(true);
  };
  const onEditHandler = () => {
    setShowModal(true);
  };
  return (
    <CategoryItemJsx
      params={{
        item,
        showModal,
        imageModal,
        closeNewRowHandler,
        showImageModalHandler,
        closeImageModalHandler,
        onEditHandler,
        onDeleteHandler,
      }}
    />
  );
};

export default CategoryItem;
